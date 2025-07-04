import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import avatar1 from "../../../assets/avatar1.jpg";
import avatar2 from "../../../assets/avatar2.jpg";
import avatar3 from "../../../assets/avatar3.jpg";

const testimonials = [
  {
    id: 1,
    name: "Jennifer Lee",
    title: "School Administrator",
    message:
      "This book management system has completely streamlined our library operations. Tracking, issuing, and managing returns is now effortless!",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "David Kim",
    title: "IT Coordinator",
    message:
      "We were looking for an efficient solution to manage our digital and physical book inventory — this platform delivered more than we expected.",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    title: "Senior Librarian",
    message:
      "I’ve used many systems, but this one stands out for its simplicity, responsiveness, and powerful features. Managing books and borrowers has never been easier.",
    avatar: avatar3,
  },
];

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="w-full bg-cover bg-center min-h-[70vh] md:min-h-[60vh] flex items-center justify-center text-white bg-black relative overflow-hidden">
      <div className="w-full container px-5 py-12 ">
        <div className="w-full transition-all duration-500 ease-in-out">
          <div className="flex flex-col items-center justify-center text-center space-y-6 px-4 md:px-6 min-h-[300px]">
            <FaQuoteLeft className="text-4xl opacity-60" />
            <p className="text-base md:text-lg font-light max-w-2xl">
              {testimonials[currentIndex].message}
            </p>
            <div className="flex flex-col items-center">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full border-2 border-white shadow-md object-cover"
              />
              <p className="mt-2 font-semibold">
                {testimonials[currentIndex].name}
              </p>
              <p className="text-sm opacity-70">
                {testimonials[currentIndex].title}
              </p>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute left-20 bottom-4 md:left-20 lg:left-40 pb-10">
            <button onClick={handlePrev} className="btn btn-circle btn-sm">
              ❮
            </button>
          </div>
          <div className="absolute right-20 bottom-4 md:right-20 lg:right-40 pb-10">
            <button onClick={handleNext} className="btn btn-circle btn-sm">
              ❯
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
