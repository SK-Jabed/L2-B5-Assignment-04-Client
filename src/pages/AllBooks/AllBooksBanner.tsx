import image from "../../assets/book-1.jpg";

const AllBooksBanner = () => {
  return (
    <div
      className="relative w-full h-[40vh] flex items-center justify-center text-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[#2D3E50] opacity-80"></div>

      <div className="relative z-10 text-white space-y-10 px-4 font-sans">
        <h1 className="text-2xl md:text-6xl font-bold font-playfair">
          Explore All Books
        </h1>
        <p className="text-lg md:text-2xl font-bold tracking-wider font-playfair">
          Browse the complete collection available in the library.
        </p>
      </div>
    </div>
  );
};

export default AllBooksBanner;
