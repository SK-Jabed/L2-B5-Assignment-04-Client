import { useEffect, useState } from "react";
import image from "../../assets/Banners/about-us.jpg";
import placeholderImage from "../../assets/Banners/about-us.jpg";

const AddBookBanner = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  // Preload the main image
  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <div className="relative w-full h-[50vh] min-h-[350px] flex items-center justify-center text-center overflow-hidden">
      {/* Background with loading optimization */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          imageLoaded ? "opacity-100" : "opacity-70"
        }`}
        style={{
          backgroundImage: `url(${imageLoaded ? image : placeholderImage})`,
          filter: imageLoaded ? "none" : "blur(4px)",
        }}
      >
        {/* Gradient overlay for better text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-white px-6 max-w-4xl mx-auto animate-fadeInUp">
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight">
            Contribute to Our Library
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium font-playfair max-w-2xl mx-auto leading-relaxed">
            Share your favorite books with our community by adding new titles to
            our growing collection.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddBookBanner;