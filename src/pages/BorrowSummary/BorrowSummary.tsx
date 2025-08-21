import { useGetBorrowQuery } from "@/redux/api/baseApi";
import BorrowSummaryBanner from "./BorrowSummaryBanner";
import { FiBook, FiHash, FiList, FiBarChart2 } from "react-icons/fi";
import Container from "@/components/shared/Container/Container";

interface IBorrow {
  _id: string;
  book: { title: string; isbn: string; coverImage?: string };
  totalQuantity: number;
  dueDate?: string;
  status?: "BORROWED" | "RETURNED" | "OVERDUE";
}

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowQuery(undefined);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="flex space-x-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full h-16 bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  const getStatusBadge = (status?: string, dueDate?: string) => {
    if (!status) return null;

    const today = new Date();
    const due = dueDate ? new Date(dueDate) : null;
    const isOverdue = due && due < today;

    if (isOverdue) {
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
          OVERDUE
        </span>
      );
    }

    switch (status) {
      case "BORROWED":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            BORROWED
          </span>
        );
      case "RETURNED":
        return (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            RETURNED
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <BorrowSummaryBanner />
      <Container>
        <div className="container mx-auto px-4 py-16">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {/* Table Header */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center text-gray-800 dark:text-white">
                <FiList className="mr-2 text-indigo-600 dark:text-indigo-400" />
                Borrow Summary
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {data?.data?.length || 0} records
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiHash className="mr-2" />#
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiBook className="mr-2" />
                        Book Details
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      ISBN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      <div className="flex items-center justify-end">
                        <FiBarChart2 className="mr-2" />
                        Quantity
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {data?.data?.map((borrow: IBorrow, index: number) => (
                    <tr
                      key={borrow._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {borrow.book.coverImage ? (
                            <img
                              className="h-10 w-10 rounded-md object-cover mr-3"
                              src={borrow.book.coverImage}
                              alt={borrow.book.title}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-md bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mr-3">
                              <FiBook className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {borrow.book.title}
                            </div>
                            {borrow.dueDate && (
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                Due:{" "}
                                {new Date(borrow.dueDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 font-mono">
                        {borrow.book.isbn}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(borrow.status, borrow.dueDate)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                          {borrow.totalQuantity}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {data?.data?.length === 0 && (
              <div className="text-center py-12">
                <FiBook className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  No borrow records
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Get started by borrowing a book from our collection.
                </p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BorrowSummary;
