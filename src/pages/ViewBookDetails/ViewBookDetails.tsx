import { useParams, useNavigate } from "react-router-dom";
import {
  useDeleteBookMutation,
  useGetBookByIdQuery,
} from "@/redux/api/baseApi";
import { FaBookOpen, FaRegCalendarAlt, FaUserEdit } from "react-icons/fa";
import { MdEdit, MdOutlineCategory, MdOutlineNumbers } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBookByIdQuery(id as string);
  const [deleteBook] = useDeleteBookMutation();

  const book = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <div className="flex space-x-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Confirm Deletion",
      text: "This action cannot be undone. Are you sure you want to delete this book?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete Book",
      cancelButtonText: "Cancel",
      background: "#ffffff",
      backdrop: `
        rgba(0,0,0,0.5)
        url("/images/books-falling.gif")
        left top
        no-repeat
      `,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBook(id);
        Swal.fire({
          title: "Deleted!",
          text: "The book has been successfully removed.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/books");
      }
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Book Header */}
          <div className="relative">
            <div className="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <FaBookOpen className="text-8xl text-white opacity-20" />
            </div>
            <div className="absolute -bottom-12 left-8">
              <div className="h-24 w-24 rounded-xl bg-white dark:bg-gray-700 shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <FaBookOpen className="text-4xl text-indigo-600 dark:text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Book Content */}
          <div className="pt-16 px-8 pb-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {book?.title}
                  </h1>
                  {book?.available ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                      <BsCheckCircle className="mr-1" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                      <BsXCircle className="mr-1" /> Unavailable
                    </span>
                  )}
                </div>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  {book?.description ||
                    "No description available for this book."}
                </p>

                {/* Book Metadata */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400">
                      <FaUserEdit className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Author
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {book?.author}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                      <MdOutlineCategory className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Genre
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {book?.genre}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                      <MdOutlineNumbers className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        ISBN
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white font-mono">
                        {book?.isbn}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                      <FaBookOpen className="text-xl" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Copies Available
                      </h3>
                      <p className="text-lg font-medium text-gray-900 dark:text-white">
                        {book?.copies}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const modal = document.getElementById(
                        "borrow_modal"
                      ) as HTMLDialogElement;
                      if (modal) modal.showModal();
                    }}
                    disabled={!book?.available}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all ${
                      book?.available
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/50"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    <FaBookOpen />
                    Borrow Book
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const modal = document.getElementById(
                        "edit_modal"
                      ) as HTMLDialogElement;
                      if (modal) modal.showModal();
                    }}
                    className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-sm"
                  >
                    <MdEdit />
                    Edit Details
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(book?._id)}
                    className="px-6 py-3 rounded-lg font-medium flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <RiDeleteBin6Line />
                    Delete Book
                  </motion.button>
                </div>
              </div>

              {/* Sidebar (for additional info) */}
              <div className="md:w-80 space-y-6">
                <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <FaRegCalendarAlt className="text-indigo-600 dark:text-indigo-400" />
                    Borrowing Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last Borrowed
                      </p>
                      <p className="text-gray-900 dark:text-white">
                        {book?.lastBorrowedDate || "Never"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Popularity
                      </p>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-indigo-600 h-2.5 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/30 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                      View Borrow History
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                      Add to Wishlist
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg">
                      Recommend Similar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Borrow Modal */}
      <dialog id="borrow_modal" className="modal">
        <div className="modal-box max-w-md">
          <h3 className="font-bold text-xl mb-4">Borrow This Book</h3>
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <input
                type="date"
                className="input input-bordered w-full"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Quantity</span>
              </label>
              <input
                type="number"
                min="1"
                max={book?.copies}
                defaultValue="1"
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button className="btn btn-primary">Confirm Borrow</button>
          </div>
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-xl mb-4">Edit Book Details</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  defaultValue={book?.title}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Author</span>
                </label>
                <input
                  type="text"
                  defaultValue={book?.author}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                defaultValue={book?.description}
                className="textarea textarea-bordered w-full"
                rows={4}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Genre</span>
                </label>
                <select
                  defaultValue={book?.genre}
                  className="select select-bordered w-full"
                >
                  <option value="FICTION">Fiction</option>
                  <option value="NON_FICTION">Non Fiction</option>
                  <option value="SCIENCE">Science</option>
                  <option value="HISTORY">History</option>
                  <option value="BIOGRAPHY">Biography</option>
                  <option value="FANTASY">Fantasy</option>
                </select>
              </div>
              <div>
                <label className="label">
                  <span className="label-text">ISBN</span>
                </label>
                <input
                  type="text"
                  defaultValue={book?.isbn}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text">Copies</span>
                </label>
                <input
                  type="number"
                  min="1"
                  defaultValue={book?.copies}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn btn-ghost">Cancel</button>
            </form>
            <button className="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </dialog>
    </motion.div>
  );
};

export default ViewBookDetails;
