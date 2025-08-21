import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiBookOpen } from "react-icons/fi";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  useBorrowBookMutation,
  useDeleteBookMutation,
  useGetBooksQuery,
} from "@/redux/api/baseApi";
import type { IBook, TBorrow } from "../../types/book.type";
import AllBooksBanner from "./AllBooksBanner";
import UpdateBookModal from "./UpdateBookModal";
import Container from "@/components/shared/Container/Container";

const AllBooks = () => {
  const { data, isLoading } = useGetBooksQuery(undefined);
  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deleteBook] = useDeleteBookMutation();
  const [createBorrow] = useBorrowBookMutation();
  const [borrowId, setBorrowId] = useState<string>();
  const [borrowCopies, setBorrowCopies] = useState<number>(0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TBorrow>();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const books = data?.data || [];
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Get books for current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <span className="loading loading-bars loading-xl text-teal-500"></span>
      </div>
    );
  }

  // No Data State
  if (!books || books.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
        <AllBooksBanner />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-teal-100 dark:border-teal-900">
            <h3 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
              No Books Found
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              It looks like there are no books available yet. Add some books to
              get started!
            </p>
            <Link
              to="/add-book"
              className="relative inline-flex items-center px-6 py-3 mt-4 text-base font-semibold text-white bg-teal-500 rounded-md overflow-hidden group hover:bg-teal-600 transition-all duration-300"
            >
              <span className="relative z-10">Add a Book</span>
              <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Delete Handler
  const deleteHandler = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2dd4bf",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBook(id);
        Swal.fire({
          title: "Deleted!",
          text: "The book has been deleted successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  // Borrow Handler
  const onSubmit = async (data: TBorrow) => {
    if (!borrowId) return;

    const quantity = Number(data.quantity);
    if (quantity > borrowCopies) {
      Swal.fire({
        icon: "error",
        title: "Invalid Quantity",
        text: `You cannot borrow more than ${borrowCopies} copies of this book.`,
        footer: "Please reduce the quantity and try again.",
      });
      const modal = document.getElementById(
        "borrow_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
      reset();
      return;
    }

    try {
      const res = await createBorrow({
        ...data,
        book: borrowId,
        quantity,
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
      reset();
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
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "An unknown error occurred. Please try again.",
        });
      }
      const modal = document.getElementById(
        "borrow_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
      reset();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <AllBooksBanner />
      <Container>
        <div className="py-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-teal-100 dark:border-teal-900 overflow-x-auto">
            <table className="w-full text-left min-w-[700px]">
              <thead className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-sm uppercase font-semibold">
                <tr>
                  <th className="py-4 px-6 w-16">#</th>
                  <th className="py-4 px-6">Title</th>
                  <th className="py-4 px-6">Author</th>
                  <th className="py-4 px-6">Genre</th>
                  <th className="py-4 px-6">ISBN</th>
                  <th className="py-4 px-6 text-center">Copies</th>
                  <th className="py-4 px-6 text-center">Availability</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700 dark:text-gray-200">
                {currentBooks?.map((book: IBook, index: number) => (
                  <tr
                    key={book?._id}
                    className="border-t border-teal-100 dark:border-teal-900 hover:bg-teal-50 dark:hover:bg-teal-900/30 transition-colors duration-200"
                  >
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6 font-medium line-clamp-1">
                      {book?.title}
                    </td>
                    <td className="py-4 px-6">{book?.author}</td>
                    <td className="py-4 px-6">{book?.genre}</td>
                    <td className="py-4 px-6">{book?.isbn}</td>
                    <td className="py-4 px-6 text-center">{book?.copies}</td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          book?.available
                            ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                            : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                        }`}
                      >
                        {book?.available ? "Available" : "Unavailable"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/books/${book?._id}`}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md overflow-hidden group hover:bg-blue-600 transition-all duration-300"
                          title="View Book"
                        >
                          <span className="relative z-10">View</span>
                          <span className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </Link>
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            const modal = document.getElementById(
                              "my_modal_1"
                            ) as HTMLDialogElement | null;
                            if (modal) modal.showModal();
                          }}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-md overflow-hidden group hover:bg-yellow-600 transition-all duration-300"
                          title="Edit Book"
                        >
                          <span className="relative z-10">
                            <MdEditSquare />
                          </span>
                          <span className="absolute inset-0 bg-yellow-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                        <button
                          onClick={() => deleteHandler(book?._id)}
                          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md overflow-hidden group hover:bg-red-600 transition-all duration-300"
                          title="Delete Book"
                        >
                          <span className="relative z-10">
                            <RiDeleteBin5Fill />
                          </span>
                          <span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </button>
                        {book?.available ? (
                          <button
                            onClick={() => {
                              const modal = document.getElementById(
                                "borrow_modal"
                              ) as HTMLDialogElement | null;
                              if (modal) modal.showModal();
                              setBorrowId(book?._id as string);
                              setBorrowCopies(book?.copies);
                            }}
                            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-teal-500 rounded-md overflow-hidden group hover:bg-teal-600 transition-all duration-300"
                            title="Borrow Book"
                          >
                            <span className="relative z-10">
                              <FiBookOpen />
                            </span>
                            <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          </button>
                        ) : (
                          <button
                            disabled
                            className="px-4 py-2 text-sm font-medium text-gray-500 bg-gray-200 dark:bg-gray-700 dark:text-gray-400 rounded-md cursor-not-allowed"
                            title="Book Unavailable"
                          >
                            Unavailable
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 gap-3 flex-wrap">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-teal-500 rounded-md overflow-hidden group hover:bg-teal-600 transition-all duration-300 ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <span className="relative z-10">Previous</span>
              <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md overflow-hidden group transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-teal-500 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 hover:bg-teal-100 dark:hover:bg-teal-900"
                }`}
              >
                <span className="relative z-10">{i + 1}</span>
                {currentPage === i + 1 ? (
                  <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                ) : (
                  <span className="absolute inset-0 bg-teal-200 dark:bg-teal-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-5 py-2 text-sm font-medium text-white bg-teal-500 rounded-md overflow-hidden group hover:bg-teal-600 transition-all duration-300 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              <span className="relative z-10">Next</span>
              <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>

          {/* Borrow Modal */}
          <dialog id="borrow_modal" className="modal">
            <div className="modal-box bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-md">
              <h3 className="font-bold text-xl text-teal-600 dark:text-teal-400 mb-5">
                Borrow Book
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Quantity
                  </legend>
                  <input
                    {...register("quantity", {
                      required: "Quantity is required",
                      min: {
                        value: 1,
                        message: "Quantity must be at least 1",
                      },
                      max: {
                        value: borrowCopies,
                        message: `Cannot borrow more than ${borrowCopies} copies`,
                      },
                    })}
                    type="number"
                    min="1"
                    placeholder="Enter quantity"
                    className={`input w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-teal-200 dark:border-teal-600 focus:ring-teal-500 focus:border-teal-500 rounded-md transition-all duration-300 ${
                      errors.quantity ? "border-red-500" : ""
                    }`}
                  />
                  {errors.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.quantity.message}
                    </p>
                  )}
                </fieldset>
                <fieldset className="space-y-2">
                  <legend className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Due Date
                  </legend>
                  <input
                    {...register("dueDate", {
                      required: "Due date is required",
                      validate: (value) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        const selectedDate = new Date(value);
                        return (
                          selectedDate >= today ||
                          "Due date cannot be in the past"
                        );
                      },
                    })}
                    type="date"
                    className={`input w-full bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-teal-200 dark:border-teal-600 focus:ring-teal-500 focus:border-teal-500 rounded-md transition-all duration-300 ${
                      errors.dueDate ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dueDate && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.dueDate.message}
                    </p>
                  )}
                </fieldset>
                <button
                  type="submit"
                  className="relative inline-flex items-center w-full px-6 py-3 text-base font-semibold text-white bg-teal-500 rounded-md overflow-hidden group hover:bg-teal-600 transition-all duration-300"
                >
                  <span className="relative z-10">Borrow Now</span>
                  <span className="absolute inset-0 bg-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </form>
              <div className="modal-action mt-4">
                <form method="dialog">
                  <button className="relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-red-500 rounded-md overflow-hidden group hover:bg-red-600 transition-all duration-300">
                    <span className="relative z-10">Close</span>
                    <span className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </form>
              </div>
            </div>
          </dialog>

          <UpdateBookModal bookData={selectedBook} />
        </div>
      </Container>
    </div>
  );
};

export default AllBooks;
