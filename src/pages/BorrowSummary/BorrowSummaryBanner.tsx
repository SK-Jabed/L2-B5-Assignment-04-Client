import { useEffect, useState } from "react";
import image from "../../assets/Banners/contact-banner.jpg";
import placeholderImage from "../../assets/Banners/contact-banner.jpg";

const BorrowSummaryBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[40vh] min-h-[300px] flex items-center justify-center text-center overflow-hidden">
      {/* Background image with loading optimization */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
          imageLoaded ? "opacity-100" : "opacity-90"
        }`}
        style={{
          backgroundImage: `url(${imageLoaded ? image : placeholderImage})`,
          filter: imageLoaded ? "none" : "blur(2px)",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-4 animate-fadeIn">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-playfair">
            Your Borrowed Books
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium font-playfair tracking-wide">
            Track and manage your borrowed books at a glance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BorrowSummaryBanner;