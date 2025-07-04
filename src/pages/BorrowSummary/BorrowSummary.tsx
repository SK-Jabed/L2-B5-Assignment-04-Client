import NewsletterSection from "@/components/shared/NewsletterSection/NewsletterSection";
import { useGetBorrowQuery } from "@/redux/Api/baseApi";
import BorrowSummaryBanner from "./BorrowSummaryBanner";

interface IBorrow {
  book: { title: string; isbn: string };
  totalQuantity: number;
}
const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowQuery(undefined);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-bars loading-xl text-[#1BBC9B]"></span>
      </div>
    );
  }

  console.log(data?.data);

  return (
    <div>
      <BorrowSummaryBanner />
      <div className="">
        <div className="overflow-x-auto border border-base-300 shadow-md bg-base-100 container mx-auto my-10">
          <table className="table table-zebra">
            <thead className="bg-gradient-to-r from-[#1BBC9B] to-[#16A085] text-white text-sm uppercase">
              <tr>
                <th className="py-3 px-4">#</th>
                <th className="py-3 px-4">Book Title</th>
                <th className="py-3 px-4">ISBN</th>
                <th className="py-3 px-4">Total Borrowed</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data?.data?.map((borrow: IBorrow, index: number) => (
                <tr key={index} className="hover:bg-base-200 transition-colors">
                  <th className="py-3 px-4">{index + 1}</th>
                  <td className="py-3 px-4 font-medium">
                    {borrow?.book?.title}
                  </td>
                  <td className="py-3 px-4">{borrow?.book?.isbn}</td>
                  <td className="py-3 px-4 font-semibold text-[#1BBC9B] text-center">
                    {borrow?.totalQuantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <NewsletterSection />
    </div>
  );
};

export default BorrowSummary;
