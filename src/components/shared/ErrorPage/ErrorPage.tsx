import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated Stars Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(50)].map((_, i) => {
          const size = Math.random() * 3 + 1;
          const left = Math.random() * 100;
          const top = Math.random() * 100;
          const duration = Math.random() * 3 + 2;

          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${left}%`,
                top: `${top}%`,
              }}
              animate={{
                opacity: [0.2, 1, 0.2],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Spinning SVG */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-8"
        >
          <svg width="150" height="150" viewBox="0 0 24 24" className="mx-auto">
            <motion.path
              d="M12 2L4 12L12 22L20 12L12 2Z"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>

        {/* Error Heading */}
        <motion.h1
          className="text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500"
          animate={{
            scale: [1, 1.05, 1],
            textShadow: ["0 0 0px #fff", "0 0 10px #8B5CF6", "0 0 0px #fff"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          404
        </motion.h1>

        <h2 className="text-3xl font-semibold mb-6">Lost in Space</h2>
        <p className="text-lg text-gray-300 mb-8">
          The page you are looking for has drifted into the cosmic void.
          Navigate back to familiar territory.
        </p>

        {/* Return Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transition duration-300"
          >
            <svg
              className="mr-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Return to Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;