"use client";

import { motion } from "framer-motion";
import "aos/dist/aos.css";

const CTASection = () => {
  return (
    <div
      className="relative py-20 text-white text-center bg-cover bg-center  rounded-xl"
      style={{ backgroundImage: "url('/bg-images/cta-bg.jpg')" }}
    >
      <div className="absolute"></div>
      <div className="relative z-10">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Unlock the Power of Learning
        </motion.h2>

        {/* Description */}
        <p className="text-base md:text-lg mt-3 text-gray-300">
          Join AI Scholar and empower your learning journey with AI-driven
          insights.
        </p>

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="mt-6 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full shadow-xl transition-all duration-300"
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
};

export default CTASection;
