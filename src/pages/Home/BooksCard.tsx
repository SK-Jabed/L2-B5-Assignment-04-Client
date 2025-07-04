import { MdEditSquare } from "react-icons/md";
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/Api/baseApi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import type { IBook, TBorrow } from "../../types/book.type";
import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import UpdateBookModal from "../AllBooks/UpdateBookModal";
import { FiBookOpen } from "react-icons/fi";
import Swal from "sweetalert2";

const BooksCard = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [bookQuantity, setBookQuantity] = useState(5);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();
  const [createBorrow] = useBorrowBookMutation();
  const [borrowId, setBorrowId] = useState<string>();
  const [borrowCopies, setborrowCopies] = useState<number>(0);
  const { register, handleSubmit } = useForm<TBorrow>();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-xl text-[#1BBC9B]"></span>
      </div>
    );
  }

  console.log(data?.data);
  console.log(borrowId);

  // delete book handler
  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      const res = await deleteBook(id);
      console.log(res);
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // borrow handler
  const onSubmit = async (data: TBorrow) => {
    if (!borrowId) return;

    if (Number(data?.quantity) > borrowCopies) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You cannot borrow more than ${borrowCopies} copies of this book.`,
        footer: "Please reduce the quantity and try again.",
      });
    }

    try {
      const res = await createBorrow({
        ...data,
        book: borrowId,
        quantity: Number(data?.quantity),
      }).unwrap();
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Book Borrowed",
        text: "Your borrow request has been submitted successfully.",
        timer: 2000,
        showConfirmButton: false,
      });

      const modal = document.getElementById(
        "borrow_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
      navigate("/borrow-summary");
    } catch (error: unknown) {
      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        "status" in error
      ) {
        const err = error as {
          status: number;
          data: {
            name: string;
            errors: Record<string, { message: string }>;
          };
        };

        if (err.status === 400 && err.data.name === "ValidationError") {
          const errorMessages = Object.values(err.data.errors)
            .map((e) => e.message)
            .join(", ");

          Swal.fire({
            icon: "error",
            title: "Validation Failed",
            text: errorMessages,
          });
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="py-10">
      <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {data?.data?.slice(0, bookQuantity)?.map((book: IBook) => (
          <div
            key={book?._id}
            className="card bg-base-100 w-full max-w-xs mx-auto shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Book Cover */}
            <figure className="w-full bg-gradient-to-br from-[#34495E] to-[#16A085] text-white relative">
              <div className="h-60 w-full flex flex-col justify-center items-center p-4 relative">
                <FiBookOpen className="text-5xl mb-3 text-white/80" />

                <div className="text-center space-y-1">
                  <h1 className="text-lg font-bold font-serif drop-shadow-md">
                    {book?.title}
                  </h1>
                  <p className="text-sm italic text-white/90">{book?.author}</p>
                </div>

                {/* Spine stripe */}
                <div className="absolute top-0 left-0 h-full w-2 bg-white/20 rounded-r"></div>

                {/* Genre tag */}
                {book?.genre && (
                  <div className="absolute top-2 right-2 bg-white text-[#1BBC9B] text-xs font-semibold px-2 py-0.5 rounded shadow">
                    {book.genre}
                  </div>
                )}
              </div>
            </figure>

            {/* Card Body */}
            <div className="card-body space-y-2 p-4">
              <h2 className="text-base font-semibold line-clamp-1 text-gray-800">
                {book?.title}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {book?.description}
              </p>

              <div className="card-actions justify-between items-center pt-2">
                {book?.available ? (
                  <button
                    onClick={() => {
                      const modal = document.getElementById(
                        "borrow_modal"
                      ) as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                      setBorrowId(book?._id as string);
                      setborrowCopies(book?.copies);
                    }}
                    className="btn btn-sm bg-[#1BBC9B] hover:bg-[#169c85] text-white"
                  >
                    Borrow
                  </button>
                ) : (
                  <button className="btn btn-sm ">Unavailable</button>
                )}

                <Link
                  to={`/books/${book?._id}`}
                  className="btn btn-sm btn-outline text-sm text-[#1BBC9B] hover:border-[#1BBC9B]"
                >
                  View
                </Link>

                <div className="flex gap-2 items-center text-lg">
                  <MdEditSquare
                    onClick={() => {
                      setSelectedBook(book);
                      const modal = document.getElementById(
                        "my_modal_1"
                      ) as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                    }}
                    className="cursor-pointer text-blue-500 hover:text-blue-600"
                  />
                  <RiDeleteBin5Fill
                    onClick={() => deleteHandler(book?._id)}
                    className="cursor-pointer text-red-500 hover:text-red-600"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <UpdateBookModal bookData={selectedBook} />

        {/* borrow modal */}
        <dialog id="borrow_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Borrow Book</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto w-full max-w-2xl space-y-4"
            >
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Quantity</legend>
                <input
                  {...register("quantity")}
                  required
                  type="number"
                  className="input input-bordered w-full"
                  placeholder="Type here"
                />
              </fieldset>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Due Date</legend>
                <input
                  {...register("dueDate")}
                  required
                  type="date"
                  className="input input-bordered w-full"
                  placeholder="Type here"
                />
              </fieldset>
              <div>
                <button className="btn bg-[#1BBC9B] hover:bg-[#16A086] text-white w-full">
                  Borrow Now
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn text-white bg-red-600">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div onClick={() => setBookQuantity(10)} className="text-center my-10">
        {bookQuantity === 5 ? (
          <button className="btn text-lg rounded-none h-12 bg-[#1BBC9B] hover:bg-[#16A086] text-white">
            LOAD MORE
          </button>
        ) : (
          <Link
            to="/books"
            className="btn text-lg rounded-none h-12 bg-[#1BBC9B] hover:bg-[#16A086] text-white"
          >
            DISCOVER MORE BOOKS
          </Link>
        )}
      </div>
    </div>
  );
};

export default BooksCard;
