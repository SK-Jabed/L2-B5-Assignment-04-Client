import { useCreateBookMutation } from "@/redux/api/baseApi";
import { useForm } from "react-hook-form";
import { FaBook, FaPenFancy, FaUserEdit } from "react-icons/fa";
import { MdDescription, MdNumbers, MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AddBookBanner from "./AddBookBanner";
import Container from "@/components/shared/Container/Container";

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

type ApiError = {
  data?: {
    error?: {
      name: string;
      errors?: Record<string, { message: string }>;
    };
    message?: string;
  };
  status?: number;
};

const AddBook = () => {
  const [createBook, { isLoading }] = useCreateBookMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TBook>({
    mode: "onChange",
  });

  const onSubmit = async (data: TBook) => {
    try {
      await createBook({
        ...data,
        copies: Number(data.copies),
        available: true,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Book Added!",
        text: "The book has been successfully added to the library.",
        timer: 2000,
        showConfirmButton: false,
      });
      reset();
      navigate("/books");
    } catch (error: unknown) {
      console.error("Error details:", error);

      const apiError = error as ApiError;

      if (apiError?.data?.error?.name === "ValidationError") {
        const validationErrors = apiError.data.error.errors || {};
        const errorMessages = Object.values(validationErrors)
          .map((err) => err.message)
          .join(", ");

        Swal.fire({
          icon: "error",
          title: "Validation Error",
          text: errorMessages || "Please check your input fields",
        });
      } else if (apiError?.data?.error?.name === "DuplicateKeyError") {
        const duplicateError = apiError.data.error.errors || {};
        const errorMessage = Object.values(duplicateError)
          .map((err) => err.message)
          .join(", ");

        Swal.fire({
          icon: "error",
          title: "Duplicate Entry",
          text: errorMessage || "This book already exists",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text:
            apiError?.data?.message || "Failed to add book. Please try again.",
        });
      }
    }
  };

  const isbnRegex = /^(?:\d{9}[\dXx]|\d{13})$/;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <AddBookBanner />
      <Container>
        <div className="py-20">
          <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                <FaBook className="text-purple-500" />
                Add New Book
              </h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-gray-700 dark:to-gray-700 ml-4 rounded-full"></div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Book Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPenFancy className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("title", {
                      required: "Title is required",
                      minLength: {
                        value: 3,
                        message: "Title must be at least 3 characters",
                      },
                      maxLength: {
                        value: 100,
                        message: "Title cannot exceed 100 characters",
                      },
                    })}
                    type="text"
                    placeholder="Enter book title"
                    className={`pl-10 input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                      errors.title ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title.message}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <MdDescription className="h-5 w-5 text-gray-400" />
                  </div>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                      minLength: {
                        value: 20,
                        message: "Description must be at least 20 characters",
                      },
                      maxLength: {
                        value: 1000,
                        message: "Description cannot exceed 1000 characters",
                      },
                    })}
                    rows={4}
                    placeholder="Brief summary or content description"
                    className={`pl-10 textarea textarea-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                      errors.description ? "border-red-500" : "border-gray-300"
                    }`}
                  ></textarea>
                </div>
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.description.message}
                  </p>
                )}
              </div>

              {/* Author */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Author
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUserEdit className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("author", {
                      required: "Author is required",
                      pattern: {
                        value: /^[A-Za-z\s]+$/,
                        message:
                          "Author name should only contain letters and spaces",
                      },
                    })}
                    type="text"
                    placeholder="Author name"
                    className={`pl-10 input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                      errors.author ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* ISBN */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ISBN
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdNumbers className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("isbn", {
                      required: "ISBN is required",
                      pattern: {
                        value: isbnRegex,
                        message: "Please enter a valid ISBN (10 or 13 digits)",
                      },
                    })}
                    type="text"
                    placeholder="ISBN number"
                    className={`pl-10 input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                      errors.isbn ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </div>
                {errors.isbn && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.isbn.message}
                  </p>
                )}
              </div>

              {/* Copies */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Number of Copies
                </label>
                <input
                  {...register("copies", {
                    required: "Number of copies is required",
                    min: {
                      value: 1,
                      message: "Must have at least 1 copy",
                    },
                    max: {
                      value: 1000,
                      message: "Cannot exceed 1000 copies",
                    },
                    valueAsNumber: true,
                  })}
                  type="number"
                  min="1"
                  max="1000"
                  placeholder="How many copies?"
                  className={`input input-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                    errors.copies ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.copies && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.copies.message}
                  </p>
                )}
              </div>

              {/* Genre */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Genre
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdCategory className="h-5 w-5 text-gray-400" />
                  </div>
                  <select
                    {...register("genre", {
                      required: "Genre is required",
                    })}
                    defaultValue=""
                    className={`pl-10 select select-bordered w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-purple-500 dark:focus:border-purple-500 ${
                      errors.genre ? "border-red-500" : "border-gray-300"
                    }`}
                  >
                    <option value="" disabled>
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
                {errors.genre && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.genre.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative inline-flex items-center justify-center w-full px-6 py-4 overflow-hidden font-medium text-white transition-all duration-300 rounded-xl group bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-purple-200 shadow-lg cursor-pointer"
                >
                  <span className="relative flex items-center justify-center">
                    {isLoading ? (
                      <span className="loading loading-spinner loading-md mr-2"></span>
                    ) : (
                      <FaBook className="w-5 h-5 mr-2" />
                    )}
                    {isLoading ? "Adding Book..." : "Add Book"}
                  </span>
                  {/* <span className="absolute inset-0 border-0 group-hover:border-[12px] border-white/20 transition-all duration-300 rounded-xl"></span> */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AddBook;
