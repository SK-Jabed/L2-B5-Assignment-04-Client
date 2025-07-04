import { useForm } from "react-hook-form";
import type { IBook } from "../../../Types/book.type";
import { useEffect } from "react";
import { useUpdateBookMutation } from "../../../Redux/Api/baseApi";
import Swal from "sweetalert2";

const UpdateBookModal = ({ bookData }: { bookData: IBook | null }) => {
  const { register, handleSubmit, reset } = useForm<IBook>();
  const [updateBook, { isLoading, isSuccess, error }] = useUpdateBookMutation();

  // Reset form values when bookData changes
  useEffect(() => {
    if (bookData) reset(bookData);
  }, [bookData, reset]);

  // Log status
  useEffect(() => {
    if (isSuccess) console.log("Update successful");
    if (error) console.error("Update failed:", error);
  }, [isSuccess, error]);

  // update book handler
  const onSubmit = async (data: IBook) => {
    try {
      // Build payload with available: true only when copies > 0
      const updatedData: IBook = {
        ...data,
        ...(Number(data.copies) > 0 && { available: true }),
      };

      const res = await updateBook(updatedData).unwrap();
      console.log("Book updated:", res);

      // ✅ Close modal
      const modal = document.getElementById(
        "my_modal_1"
      ) as HTMLDialogElement | null;
      modal?.close();

      // ✅ Show success alert
      Swal.fire({
        icon: "success",
        title: "Book Updated!",
        text: "The book details have been successfully updated.",
      });
    } catch (err: unknown) {
      console.error("Update failed:", err);

      if (
        typeof err === "object" &&
        err !== null &&
        "data" in err &&
        "status" in err
      ) {
        const error = err as {
          status: number;
          data: {
            message?: string;
            errors?: Record<string, { message: string }>;
          };
        };

        const errorMessages = error.data?.errors
          ? Object.values(error.data.errors)
              .map((e) => e.message)
              .join(", ")
          : error.data?.message ||
            "Something went wrong while updating the book.";

        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: errorMessages,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "An unknown error occurred. Please try again.",
        });
      }
    }
  };

  if (!bookData) return null; // ✅ Don't render if no book selected

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-xl text-[#1BBC9B]"></span>
      </div>
    );
  }
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Edit Book</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto w-full max-w-2xl"
        >
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Title</legend>
            <input
              {...register("title")}
              required
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Description</legend>
            <textarea
              {...register("description")}
              required
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Author</legend>
            <input
              {...register("author")}
              required
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">ISBN</legend>
            <input
              {...register("isbn")}
              required
              type="text"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Copies</legend>
            <input
              {...register("copies")}
              required
              type="number"
              className="input w-full"
              placeholder="Type here"
            />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">Genre</legend>
            <select {...register("genre")} required className="select w-full">
              <option value="FICTION">Fiction</option>
              <option value="NON_FICTION">Non Fiction</option>
              <option value="SCIENCE">Science</option>
              <option value="HISTORY">History</option>
              <option value="BIOGRAPHY">Biography</option>
              <option value="FANTASY">Fantasy</option>
            </select>
          </fieldset>
          <button className="btn bg-[#1BBC9B] hover:bg-[#16A086] text-white w-full mt-4">
            Update Book
          </button>
        </form>
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
