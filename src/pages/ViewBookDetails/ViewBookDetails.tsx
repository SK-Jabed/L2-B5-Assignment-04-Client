// import { useParams, useNavigate } from "react-router-dom";
import {
  useGetBookByIdQuery,
  useDeleteBookMutation,
} from "@/redux/Api/baseApi";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaBookOpen } from "react-icons/fa";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data, isLoading } = useGetBookByIdQuery(id as string);
  const [deleteBook] = useDeleteBookMutation();

  const book = data?.data;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This book will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBook(id);
        Swal.fire("Deleted!", "The book has been deleted.", "success");
        navigate("/books"); // change route as needed
      }
    });
  };

  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Book Cover */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-[#1BBC9B] to-[#16A085] text-white p-6 rounded-lg shadow relative">
            <FaBookOpen className="text-5xl mb-4 mx-auto" />
            <h2 className="text-xl font-bold text-center">{book?.title}</h2>
            <p className="text-center italic">{book?.author}</p>
            {book?.genre && (
              <div className="absolute top-4 right-4 bg-white text-[#1BBC9B] text-xs font-semibold px-2 py-1 rounded shadow">
                {book.genre}
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{book?.title}</h1>
            <p className="text-gray-600">{book?.description}</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Author:</span> {book?.author}
              </p>
              <p>
                <span className="font-semibold">Genre:</span> {book?.genre}
              </p>
              <p>
                <span className="font-semibold">ISBN:</span> {book?.isbn}
              </p>
              <p>
                <span className="font-semibold">Copies:</span> {book?.copies}
              </p>
              <p>
                <span className="font-semibold">Available:</span>{" "}
                {book?.available ? "Yes" : "No"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mt-6">
              <button
                className="btn btn-sm btn-error flex items-center gap-1"
                onClick={() => handleDelete(book?._id)}
              >
                <RiDeleteBin5Fill /> Delete
              </button>
              <button
                className="btn btn-sm btn-accent flex items-center gap-1"
                onClick={() => {
                  const modal = document.getElementById(
                    "borrow_modal"
                  ) as HTMLDialogElement;
                  if (modal) modal.showModal();
                }}
              >
                📖 Borrow
              </button>
              <button
                className="btn btn-sm btn-info flex items-center gap-1"
                onClick={() => {
                  const modal = document.getElementById(
                    "edit_modal"
                  ) as HTMLDialogElement;
                  if (modal) modal.showModal();
                }}
              >
                <MdEditSquare /> Edit
              </button>
            </div>
          </div>
        </div>

        {/* Optional: Borrow Modal */}
        <dialog id="borrow_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Borrow Book</h3>
            <p>Borrow form goes here...</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>

        {/* Optional: Edit Modal */}
        <dialog id="edit_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Book</h3>
            <p>Edit form goes here...</p>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default ViewBookDetails;
