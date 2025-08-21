import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ctaBg from "../../../assets/Banners/cta-bg.jpg";
import Container from "../Container/Container";

const CTASection = () => {
  return (
    <Container>
      <div className="relative w-full rounded-xl overflow-hidden my-28">
        {/* Background Image Layer */}
        <img
          src={ctaBg}
          alt="CTA Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay for Dark Effect */}
        <div className="absolute inset-0 bg-opacity-60 z-10" />

        {/* Content */}
        <div className="relative z-20 py-20 text-center text-white">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-5xl font-bold leading-tight"
          >
            Discover & Borrow Your Next Favorite Book
          </motion.h2>

          {/* Description */}
          <p className="text-base md:text-lg mt-4 text-gray-300 max-w-2xl mx-auto">
            Dive into a vast collection of books and enjoy seamless borrowing
            with BoiBazaar — your trusted online book haven.
          </p>

          {/* Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/books"
              className="mt-6 inline-block px-8 py-3 bg-[#1BBC9B] hover:bg-[#16A086] text-white font-semibold rounded-full shadow-lg transition-all duration-300"
            >
              Explore Books
            </Link>
          </motion.div>
        </div>
      </div>
    </Container>
  );
};

export default CTASection;