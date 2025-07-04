import { useEffect, useState } from "react";
import image1 from "../../../assets/book-1.jpg";
import image2 from "../../../assets/book-2.jpg";
import { Link } from "react-router";

const HomeBanner = () => {
  const bgImages = [image1, image2];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === bgImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [bgImages?.length]);

  return (
    <div
      className="relative w-full h-[90vh] flex items-center justify-center text-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${bgImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#2D3E50] opacity-75"></div>

      <div className="relative z-10 text-white space-y-10 px-4 font-sans">
        <h1 className="text-2xl md:text-6xl font-bold font-playfair">
          Effortless Library Management <br /> at Your Fingertips
        </h1>
        <p className="text-lg md:text-2xl font-bold tracking-wider font-playfair">
          Manage books, borrows, and users — all in one place.
        </p>
        <div className="text-center">
          <Link
            to="/books"
            className="btn bg-[#1BBC9B] text-white text-lg h-12 hover:bg-[#16A086] rounded-none"
          >
            DISCOVER ALL BOOKS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeBanner;
