import { useUpdateBookMutation } from "@/redux/api/baseApi";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import type { IBook } from "../../types/book.type";

const UpdateBookModal = ({ bookData }: { bookData: IBook | null }) => {
  const { register, handleSubmit, reset, watch } = useForm<IBook>();
  const [updateBook, { isSuccess, error }] = useUpdateBookMutation();

  // Watch copies to update availability
  const copies = watch("copies");

  // Reset form when data changes
  useEffect(() => {
    if (bookData) {
      reset(bookData);
    }
  }, [bookData, reset]);

  // Log update status
  useEffect(() => {
    if (isSuccess) console.log("Update successful");
    if (error) console.error("Update failed:", error);
  }, [isSuccess, error]);

  // Submit Handler
  const onSubmit = async (data: IBook) => {
    const updatedData: IBook = {
      ...data,
      copies: Number(data.copies),
      available: Number(data.copies) > 0,
    };

    try {
      const res = await updateBook(updatedData).unwrap();
      console.log("Book updated:", res);

      const modal = document.getElementById("my_modal_1") as HTMLDialogElement;
      modal?.close();

      Swal.fire({
        icon: "success",
        title: "Book Updated!",
        text: "The book details have been successfully updated.",
      });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const message = err?.data?.errors
        ? Object.values(err.data.errors)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((e: any) => e.message)
            .join(", ")
        : err?.data?.message || "Something went wrong.";

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: message,
      });
    }
  };

  if (!bookData) return null;

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box max-w-2xl w-full">
        <h3 className="text-2xl font-semibold text-[#1BBC9B] mb-6">
          Update Book Details
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="label">Title</label>
            <input
              {...register("title", { required: "Title is required" })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
              placeholder="Book title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
              placeholder="Brief summary of the book"
            ></textarea>
          </div>

          {/* Author */}
          <div>
            <label className="label">Author</label>
            <input
              {...register("author", { required: "Author name is required" })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
              placeholder="Author's name"
            />
          </div>

          {/* ISBN */}
          <div>
            <label className="label">ISBN</label>
            <input
              {...register("isbn", {
                required: "ISBN is required",
                pattern: {
                  value: /^[\d-]+$/,
                  message: "Invalid ISBN format",
                },
              })}
              type="text"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
              placeholder="ISBN number"
            />
          </div>

          {/* Copies */}
          <div>
            <label className="label">Number of Copies</label>
            <input
              {...register("copies", {
                required: "Number of copies is required",
                valueAsNumber: true,
                min: {
                  value: 0,
                  message: "Copies cannot be negative",
                },
              })}
              type="number"
              className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
              placeholder="How many copies?"
            />
            <p className="text-sm text-gray-500 mt-1">
              Availability will be set to{" "}
              {Number(copies) > 0 ? `"Available"` : `"Unavailable"`}
            </p>
          </div>

          {/* Genre */}
          <div>
            <label className="label">Genre</label>
            <select
              {...register("genre", { required: "Genre is required" })}
              className="select select-bordered w-full focus:outline-none focus:ring-2 focus:ring-[#1BBC9B]"
            >
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn w-full bg-[#1BBC9B] hover:bg-[#16A086] text-white text-lg"
          >
            Update Book
          </button>
        </form>

        {/* Modal Footer */}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn bg-red-600 text-white">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default UpdateBookModal;
