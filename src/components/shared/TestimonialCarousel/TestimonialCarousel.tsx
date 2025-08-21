import { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import avatar1 from "../../../assets/clients/client-1.jpg";
import avatar2 from "../../../assets/clients/client-5.png";
import avatar3 from "../../../assets/avatar3.jpg";
import avatar4 from "../../../assets/avatar2.jpg";
import Container from "../Container/Container";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  message: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "David Latham",
    title: "School Librarian",
    message:
      "BoiBazaar has revolutionized our library operations. Its intuitive interface and robust features make book tracking and borrowing effortless, saving us countless hours.",
    avatar: avatar1,
  },
  {
    id: 2,
    name: "Jenifer Lee",
    title: "Bookstore Manager",
    message:
      "This platform is a game-changer for managing our book inventory. Its reliability and ease of use have significantly improved our customer experience.",
    avatar: avatar2,
  },
  {
    id: 3,
    name: "Ayesha Khan",
    title: "Senior Librarian",
    message:
      "With over 15 years in library management, I can say BoiBazaar is unmatched. Its simplicity and powerful tools make managing our collection a joy.",
    avatar: avatar3,
  },
  {
    id: 4,
    name: "Michael Owen",
    title: "University Professor",
    message:
      "BoiBazaar's analytics have optimized our book acquisitions, boosting student engagement by 30%. It's an essential tool for any educational institution.",
    avatar: avatar4,
  },
];

const SectionTitle = ({
  title,
  description,
  centered = true,
}: {
  title: string;
  description?: string;
  centered?: boolean;
}) => {
  return (
    <div className={`${centered ? "text-center" : "text-left"} mb-14`}>
      <div className="relative inline-block">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent relative z-10">
          {title}
        </h2>
        <div className="absolute -bottom-2 left-0 w-full h-2 bg-teal-100 dark:bg-teal-900/30 rounded-full z-0"></div>
      </div>
      {description && (
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  const handleNext = (): void => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    resetAutoPlay();
  };

  const handlePrev = (): void => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
    resetAutoPlay();
  };

  const goToIndex = (index: number): void => {
    setCurrentIndex(index);
    resetAutoPlay();
  };

  const resetAutoPlay = (): void => {
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <section className="w-full py-14 md:py-20 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden mt-16">
      <Container>
        <SectionTitle
          title="What Our Community Says"
          description="Hear from librarians, educators, and book lovers who trust BoiBazaar to manage and share their collections."
          centered={true}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Cards */}
          <div className="relative h-[400px] md:h-[360px] overflow-hidden">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${
                  index === currentIndex
                    ? "opacity-100 scale-100"
                    : index < currentIndex
                    ? "opacity-0 -translate-x-12 scale-95"
                    : "opacity-0 translate-x-12 scale-95"
                }`}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-10 h-full flex flex-col justify-center items-center text-center relative overflow-hidden border border-teal-100 dark:border-teal-900">
                  <div className="absolute top-4 left-4 text-teal-200 dark:text-teal-700 text-5xl opacity-30">
                    <FaQuoteLeft />
                  </div>
                  <div className="absolute bottom-4 right-4 text-teal-200 dark:text-teal-700 text-5xl opacity-30">
                    <FaQuoteRight />
                  </div>

                  <div className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 mb-6 leading-relaxed font-light">
                      {testimonial.message}
                    </p>

                    <div className="flex flex-col items-center">
                      <div className="relative mb-4 group">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full border-4 border-teal-100 dark:border-teal-600 shadow-md object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-teal-500 rounded-full p-1.5 transition-transform duration-300 group-hover:scale-110">
                          <div className="bg-white dark:bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 text-teal-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <h4 className="text-xl font-semibold text-teal-600 dark:text-teal-400">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        {testimonial.title}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-teal-500 dark:bg-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-300 text-white hover:scale-110 z-10"
            aria-label="Previous testimonial"
          >
            <IoIosArrowBack className="text-xl" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-teal-500 dark:bg-teal-600 p-3 rounded-full shadow-lg hover:bg-teal-600 dark:hover:bg-teal-700 transition-all duration-300 text-white hover:scale-110 z-10"
            aria-label="Next testimonial"
          >
            <IoIosArrowForward className="text-xl" />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-teal-500 w-6"
                    : "bg-gray-300 dark:bg-gray-600 hover:bg-teal-400 dark:hover:bg-teal-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialCarousel;
