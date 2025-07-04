import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "../../../Redux/Api/baseApi";
import AddBookBanner from "./AddBookBanner";
import { FaBook } from "react-icons/fa";
import NewsletterSection from "../../Shared/NewsletterSection/NewsletterSection";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

type TBook = {
  title: string;
  author: string;
  genre:
    | "FICTION"
    | "NON_FICTION"
    | "SCIENCE"
    | "HISTORY"
    | "BIOGRAPHY"
    | "FANTASY";
  isbn: string;
  description: string;
  copies: number;
};

const AddBook = () => {
  const [createBook] = useCreateBookMutation();
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm<TBook>();
  const onSubmit = async (data: TBook) => {
    try {
      const res = await createBook({
        ...data,
        copies: Number(data.copies),
        available: true,
      }).unwrap();

      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: "The book has been successfully added to the library.",
      });
      reset();
      navigate("/books");
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
            name?: string;
            message?: string;
            errors?: Record<string, { message: string }>;
          };
        };

        // 🧠 Handle validation errors from backend
        if (err.status === 400 && err.data?.errors) {
          const errorMessages = Object.values(err.data.errors)
            .map((e) => e.message)
            .join(", ");

          Swal.fire({
            icon: "error",
            title: "Validation Error",
            text: errorMessages,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              err.data?.message || "Something went wrong. Please try again.",
          });
        }
      } else {
        // Unknown error fallback
        Swal.fire({
          icon: "error",
          title: "Unexpected Error",
          text: "An unknown error occurred. Please try again later.",
        });

        console.error("Unhandled error:", error);
      }
    }
  };

  return (
    <div>
      <AddBookBanner />
      <div className="container mx-auto px-4 py-10">
        <div className="max-w-2xl mx-auto bg-base-100 p-8 rounded-xl shadow-lg border border-base-200">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-[#16A086]">
            <FaBook /> Add New Book
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Title */}
            <div>
              <label className="label font-medium mb-1">Title</label>
              <input
                {...register("title")}
                type="text"
                required
                placeholder="Enter book title"
                className="input input-bordered w-full"
              />
            </div>

            {/* Description */}
            <div>
              <label className="label font-medium mb-1">Description</label>
              <textarea
                {...register("description")}
                required
                placeholder="Brief summary or content description"
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>

            {/* Author */}
            <div>
              <label className="label font-medium mb-1">Author</label>
              <input
                {...register("author")}
                type="text"
                required
                placeholder="Author name"
                className="input input-bordered w-full"
              />
            </div>

            {/* ISBN */}
            <div>
              <label className="label font-medium mb-1">ISBN</label>
              <input
                {...register("isbn")}
                type="text"
                required
                placeholder="ISBN number"
                className="input input-bordered w-full"
              />
            </div>

            {/* Copies */}
            <div>
              <label className="label font-medium mb-1">Number of Copies</label>
              <input
                {...register("copies")}
                type="number"
                min="1"
                required
                placeholder="How many copies?"
                className="input input-bordered w-full"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="label font-medium mb-1">Genre</label>
              <select
                {...register("genre")}
                required
                className="select select-bordered w-full"
              >
                <option value="" disabled selected>
                  Select genre
                </option>
                <option value="FICTION">Fiction</option>
                <option value="NON_FICTION">Non Fiction</option>
                <option value="SCIENCE">Science</option>
                <option value="HISTORY">History</option>
                <option value="BIOGRAPHY">Biography</option>
                <option value="FANTASY">Fantasy</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="text-end">
              <button
                type="submit"
                className="btn text-lg rounded-none h-12 bg-[#1BBC9B] hover:bg-[#16A086] text-white"
              >
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
      <NewsletterSection />
    </div>
  );
};

export default AddBook;
