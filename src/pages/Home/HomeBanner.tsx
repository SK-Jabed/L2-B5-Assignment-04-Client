import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image1 from "../../assets/Home-Banner/banner-7.jpg";
import image2 from "../../assets/Home-Banner/banner-4.jpg";
import featuredBook from "../../assets/book-6.jpg";

const HomeBanner = () => {
  const bgImages = [image1, image2];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [bgImages.length]);

  return (
    <div className="relative w-full min-h-[90vh] flex items-center overflow-hidden mb-24">
      {/* Background slideshow with overlay */}
      <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out">
        {bgImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/60"></div>
      </div>

      {/* Content container */}
      <div className="container mx-auto px-8 sm:px-12d md:px-16 lg:px-24 relative z-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div className="text-left space-y-6">
            {/* Badge with subtitle */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
              <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">
                LIBRARY MANAGEMENT SYSTEM
              </span>
              <span className="ml-2 w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Revolutionize Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                Library Experience
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl leading-relaxed">
              BoiBazaar provides cutting-edge solutions for modern libraries.
              Streamline cataloging, borrowing, and inventory management with
              our intuitive platform designed for educators and book lovers.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                to="/books"
                className="relative inline-flex items-center justify-center px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-500 ease-out rounded-xl group bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 hover:bg-right-bottom focus:ring-4 focus:ring-purple-200/50 shadow-lg hover:shadow-purple-500/40 active:scale-95"
                aria-label="Explore our book collection"
              >
                {/* Main content with icon and text */}
                <span className="relative z-10 flex items-center transition-all duration-300 group-hover:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:rotate-12"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                  </svg>
                  EXPLORE BOOKS
                </span>

                {/* Animated background elements */}
                <span className="absolute inset-0 transition-all duration-700 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-white/10 via-white/5 to-white/10"></span>

                {/* Pulse animation on hover */}
                <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-500 origin-left transform scale-x-0 bg-white/30 group-hover:scale-x-100"></span>

                {/* Glow effect */}
                <span className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_0_rgba(124,58,237,0.5)]"></span>
              </Link>

              <Link
                to="/demo"
                className="px-8 py-4 font-medium text-white border-2 border-white/30 rounded-lg hover:bg-white/10 transition-all duration-300 hover:border-white/50"
              >
                Request Demo
              </Link>
            </div>
          </div>

          {/* Featured image */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-full min-h-[500px]">
              <div className="absolute -right-10 -top-10 w-full h-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute right-0 top-0 w-full h-full bg-gradient-to-br from-indigo-600/10 to-purple-600/10 rounded-3xl transform -rotate-3"></div>
              <img
                src={featuredBook}
                alt="Featured Book"
                className="relative w-full h-auto max-w-md mx-auto top-14 left-6 rounded-xl shadow-2xl object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce w-6 h-6 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;