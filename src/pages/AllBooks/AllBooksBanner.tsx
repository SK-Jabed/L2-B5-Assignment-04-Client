import { useEffect, useState } from "react";
import image from "../../assets/Banners/background-4.jpg";
import placeholderImage from "../../assets/Banners/background-4.jpg";

const AllBooksBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the main image
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] md:h-[50vh] flex items-center justify-center text-center overflow-hidden">
      {/* Background with loading optimization */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          imageLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: `url(${imageLoaded ? image : placeholderImage})`,
          filter: imageLoaded ? "none" : "blur(5px)",
        }}
      >
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight">
          Explore Our Book Collection
        </h1>
        <p className="text-base md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
          Discover thousands of books across all genres. Find your next great
          read in our carefully curated library.
        </p>
      </div>

      {/* Scrolling indicator for full-page banners (optional) */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
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
  );
};

export default AllBooksBanner;
