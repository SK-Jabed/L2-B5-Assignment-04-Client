import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook } from "../../Types/book.type";

// https://library-server-sandy.vercel.app/

export const libraryApi = createApi({
  reducerPath: "libraryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-server-sandy.vercel.app/api",
  }),
  tagTypes: ["books", "borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books",
      providesTags: ["books"],
    }),
    createBook: builder.mutation({
      query: (bookData) => ({
        url: "/books",
        method: "POST",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    getBookById: builder.query({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "Get",
      }),
      providesTags: ["books"],
    }),
    updateBook: builder.mutation({
      query: (bookData: IBook) => ({
        url: `/books/${bookData?._id}`,
        method: "PUT",
        body: bookData,
      }),
      invalidatesTags: ["books"],
    }),
    deleteBook: builder.mutation({
      query: (id: string) => ({
        url: `/books/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["books"],
    }),
    BorrowBook: builder.mutation({
      query: (borrowData) => ({
        url: "/borrow",
        method: "POST",
        body: borrowData,
      }),
      invalidatesTags: ["borrows"],
    }),
    getBorrow: builder.query({
      query: () => "/borrow",
      providesTags: ["borrows"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useCreateBookMutation,
  useDeleteBookMutation,
  useGetBookByIdQuery,
  useBorrowBookMutation,
  useGetBorrowQuery,
  useUpdateBookMutation,
} = libraryApi;