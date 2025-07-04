import MainLayout from "@/layouts/MainLayout";
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
        element: <ViewBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);

export default router;
