import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBookOpen } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import type { IBook, TBorrow } from "../../types/book.type";
import UpdateBookModal from "../AllBooks/UpdateBookModal";
import Container from "@/components/shared/Container/Container";

const BooksCard = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [bookQuantity, setBookQuantity] = useState(8);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();
  const [createBorrow] = useBorrowBookMutation();
  const [borrowId, setBorrowId] = useState<string>();
  const [borrowCopies, setBorrowCopies] = useState<number>(0);

  const { register, handleSubmit } = useForm<TBorrow>();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex space-x-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-64 h-96 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const deleteHandler = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your book has been deleted.",
          icon: "success",
        });
      } catch {
        Swal.fire({
          title: "Error",
          text: "Failed to delete book",
          icon: "error",
        });
      }
    }
  };

  const onSubmit = async (data: TBorrow) => {
    if (!borrowId) return;

    if (Number(data?.quantity) > borrowCopies) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You cannot borrow more than ${borrowCopies} copies of this book.`,
        footer: "Please reduce the quantity and try again.",
      });
      return;
    }

    try {
      await createBorrow({
        ...data,
        book: borrowId,
        quantity: Number(data?.quantity),
      }).unwrap();

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
      let errorMessage = "An error occurred while processing your request";

      if (
        typeof error === "object" &&
        error !== null &&
        "data" in error &&
        "status" in error
      ) {
        const apiError = error as {
          status: number;
          data: {
            name: string;
            errors?: Record<string, { message: string }>;
            message?: string;
          };
        };

        if (
          apiError.status === 400 &&
          apiError.data.name === "ValidationError"
        ) {
          errorMessage = apiError.data.errors
            ? Object.values(apiError.data.errors)
                .map((e) => e.message)
                .join(", ")
            : apiError.data.message || errorMessage;
        } else if (apiError.data.message) {
          errorMessage = apiError.data.message;
        }
      }

      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }
  };

  return (
    <div className="py-12 mb-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.data?.slice(0, bookQuantity)?.map((book: IBook) => (
            <div
              key={book?._id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
            >
              <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex flex-col justify-center items-center p-6 text-center text-white">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
                <FiBookOpen className="text-5xl mb-4 text-white/90 z-10" />
                <h3 className="text-xl font-bold z-10 line-clamp-1">
                  {book?.title}
                </h3>
                <p className="text-sm italic z-10">{book?.author}</p>

                {book?.genre && (
                  <div className="absolute top-4 right-4 bg-white/90 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                    {book.genre}
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {book?.description || "No description available"}
                  </p>
                </div>

                <div className="flex items-center mb-6">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-2 ${
                      book?.available ? "bg-green-500" : "bg-red-500"
                    }`}
                  ></span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {book?.available ? "Available" : "Unavailable"}
                  </span>
                  {book?.available && (
                    <span className="ml-auto text-sm font-medium text-gray-500 dark:text-gray-400">
                      {book?.copies} copies
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => {
                      if (!book?.available) return;
                      const modal = document.getElementById(
                        "borrow_modal"
                      ) as HTMLDialogElement | null;
                      if (modal) modal.showModal();
                      setBorrowId(book?._id as string);
                      setBorrowCopies(book?.copies);
                    }}
                    className={`relative px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      book?.available
                        ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md hover:shadow-lg"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                    disabled={!book?.available}
                  >
                    <span className="relative z-10">Borrow</span>
                    {book?.available && (
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></span>
                    )}
                  </button>

                  <Link
                    to={`/books/${book?._id}`}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                  >
                    Details
                  </Link>

                  <div className="flex space-x-3 text-lg">
                    <MdEditSquare
                      onClick={() => {
                        setSelectedBook(book);
                        const modal = document.getElementById(
                          "my_modal_1"
                        ) as HTMLDialogElement | null;
                        if (modal) modal.showModal();
                      }}
                      className="cursor-pointer text-blue-500 hover:text-blue-600 transition-colors duration-200"
                    />
                    <RiDeleteBin5Fill
                      onClick={() => deleteHandler(book?._id)}
                      className="cursor-pointer text-red-500 hover:text-red-600 transition-colors duration-200"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          {bookQuantity < (data?.data?.length || 0) ? (
            <button
              onClick={() => setBookQuantity((prev) => prev + 8)}
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 rounded-xl group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl mt-[-64px]"
            >
              <span className="relative z-10 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                    clipRule="evenodd"
                  />
                </svg>
                Load More Books
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></span>
            </button>
          ) : (
            <Link
              to="/books"
              className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-white transition-all duration-300 rounded-xl group bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 shadow-lg hover:shadow-xl mt-[-64px]"
            >
              <span className="relative z-10 flex items-center">
                <FiBookOpen className="h-5 w-5 mr-2" />
                Browse All Books
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></span>
            </Link>
          )}
        </div>
      </Container>

      <UpdateBookModal bookData={selectedBook} />

      <dialog id="borrow_modal" className="modal">
        <div className="modal-box max-w-md">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-xl mb-6 text-gray-800 dark:text-white">
            Borrow This Book
          </h3>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Quantity
                </span>
              </label>
              <input
                {...register("quantity", {
                  required: true,
                  min: 1,
                  max: borrowCopies,
                })}
                type="number"
                min="1"
                max={borrowCopies}
                className="input input-bordered w-full bg-white dark:bg-gray-700"
                placeholder={`Max ${borrowCopies} available`}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700 dark:text-gray-300">
                  Due Date
                </span>
              </label>
              <input
                {...register("dueDate", { required: true })}
                type="date"
                className="input input-bordered w-full bg-white dark:bg-gray-700"
              />
            </div>
            <div className="modal-action">
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Confirm Borrow
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default BooksCard;
