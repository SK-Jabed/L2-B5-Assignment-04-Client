import MainLayout from "@/layouts/MainLayout";
import AddBook from "@/pages/AddBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import Home from "@/pages/Home/Home";
import ViewBookDetails from "@/pages/ViewBookDetails/ViewBookDetails";
import { createBrowserRouter } from "react-router";


const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/create-book",
        element: <AddBook />,
      },
      {
        path: "/books/:id",
        element: <ViewBookDetails />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;