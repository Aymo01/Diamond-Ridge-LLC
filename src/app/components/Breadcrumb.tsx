import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";
import { motion } from "motion/react";

export function Breadcrumb() {
  const location = useLocation();
  
  // Map paths to readable names
  const pathNames: Record<string, string> = {
    "/about": "About Us",
    "/services": "Our Services",
    "/why-us": "Why Choose Us",
    "/handybook": "HandyBook",
    "/quote": "Request a Quote",
    "/contact": "Contact Us",
    "/feedback": "Feedback",
    "/privacy-policy": "Privacy Policy",
    "/blog": "Blog",
  };

  // Don't show breadcrumb on home page
  if (location.pathname === "/") {
    return null;
  }

  // Handle dynamic routes like /handybook/:id
  let currentPageName = pathNames[location.pathname];
  
  if (!currentPageName) {
    if (location.pathname.startsWith("/handybook/")) {
      currentPageName = "Article";
    } else {
      currentPageName = "Page";
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-50 border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <Link 
            to="/" 
            className="flex items-center gap-1 text-gray-600 hover:text-[#D08700] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-[#D08700] font-semibold">{currentPageName}</span>
        </div>
      </div>
    </motion.div>
  );
}