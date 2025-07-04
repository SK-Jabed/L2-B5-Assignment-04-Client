import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
  return (
    <section className="bg-[#16A086] py-20 px-4 text-white text-center mt-20">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 font-serif">
          Stay in Touch with Our Updates
        </h2>
        <div className="h-1 w-10 mx-auto bg-white/50 mb-6"></div>

        <form className="flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="Enter Your Email Address"
            className="input input-bordered w-full md:w-96 text-black"
          />
          <button className="btn bg-black text-white hover:bg-gray-800 flex items-center gap-2">
            <FaPaperPlane />
            GET IN TOUCH
          </button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-4 text-sm">
          <input type="checkbox" className="checkbox checkbox-xs" />
          <span>
            I agree to the{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
