import { motion } from "motion/react";
import { Link } from "react-router";
import { Home, Phone } from "lucide-react";
import logo from "@/assets/logo.png";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.4, 1],
        }}
        transition={{
          rotate: { duration: 40, repeat: Infinity, ease: "linear" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#D08700] rounded-full opacity-10 blur-3xl"
      />
      <motion.div
        animate={{
          rotate: -360,
          scale: [1, 1.5, 1],
        }}
        transition={{
          rotate: { duration: 50, repeat: Infinity, ease: "linear" },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#D08700] rounded-full opacity-10 blur-3xl"
      />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="Diamond Ridge LLC" 
              className="h-24 mx-auto brightness-0 invert"
            />
          </motion.div>

          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-9xl md:text-[200px] font-bold text-[#D08700] leading-none">
              404
            </h1>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Page Not Found
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          >
            Sorry, the page you're looking for doesn't exist. It might have been moved or deleted.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#D08700] to-[#B87200] text-white px-8 py-4 rounded-lg flex items-center gap-3 shadow-lg hover:shadow-xl transition-all text-lg font-semibold"
              >
                <Home className="w-6 h-6" />
                Go Home
              </motion.button>
            </Link>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg border-2 border-white/20 hover:border-[#D08700] transition-all flex items-center gap-3 text-lg font-semibold"
              >
                <Phone className="w-6 h-6" />
                Contact Us
              </motion.button>
            </Link>
          </motion.div>

          {/* Additional Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <p className="text-gray-400 mb-4">
              Need immediate assistance?
            </p>
            <div className="flex flex-wrap gap-6 justify-center text-sm">
              <a 
                href="tel:4648883930" 
                className="text-[#D08700] hover:text-[#B87200] transition-colors font-semibold"
              >
                Call: (464) 888-3930
              </a>
              <a 
                href="mailto:info@diamondridgellc.us" 
                className="text-[#D08700] hover:text-[#B87200] transition-colors font-semibold"
              >
                Email: info@diamondridgellc.us
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
