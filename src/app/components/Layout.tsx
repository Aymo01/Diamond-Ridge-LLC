import { Outlet, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Menu, X, Phone, MapPin, Mail, MessageCircle, ChevronUp, Send, CheckCircle, AlertCircle, Loader, Instagram, Facebook, Copy } from "lucide-react";
import logo from "@/assets/logo.png";
import { Breadcrumb } from "./Breadcrumb";
import { sendEmail, TEMPLATES } from "../utils/emailjs";

export function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const location = useLocation();
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  // Keyboard shortcut: Ctrl+Shift+X to open Admin Panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'X') {
        e.preventDefault();
        setShowAdminPanel(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyStatus(label);
      setTimeout(() => setCopyStatus(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("loading");
    setNewsletterMessage("");
    try {
      const templateParams = {
        form_type: 'Newsletter Signup',
        name: 'Newsletter Subscriber',
        from_name: 'Newsletter Subscriber',
        from_email: newsletterEmail,
        message: 'New newsletter signup: ' + newsletterEmail,
        subject: 'New Newsletter Signup',
        service: '',
        rating: ''
      };
      const result = await sendEmail(TEMPLATES.NEWSLETTER, templateParams);
      if (!result.success) {
        throw result.error || new Error("Failed to subscribe.");
      }
      setNewsletterStatus("success");
      setNewsletterMessage("Thank you for subscribing! You'll receive maintenance tips and updates from Diamond Ridge LLC.");
      setNewsletterEmail("");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 5000);
    } catch (error: any) {
      console.error('Newsletter signup error:', error);
      setNewsletterStatus("error");
      setNewsletterMessage("Failed to subscribe. Please try again later.");
      setTimeout(() => {
        setNewsletterStatus("idle");
        setNewsletterMessage("");
      }, 5000);
    }
  };

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Why Us", path: "/why-us" },
    { name: "HandyBook", path: "/handybook" },
    { name: "Request Quote", path: "/quote" },
    { name: "Contact", path: "/contact" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Social Floating Icons - Bottom Left */}
      <div className="fixed left-6 bottom-6 z-50 flex flex-col gap-4">
        <motion.a
          href="https://www.instagram.com/diamond.ridge.llc/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border border-white"
          style={{ backgroundColor: '#111929', color: 'white' }}
        >
          <Instagram size={24} />
        </motion.a>
        <motion.a
          href="https://www.facebook.com/profile.php?id=61586614971860"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all border border-white"
          style={{ backgroundColor: '#111929', color: 'white' }}
        >
          <Facebook size={24} />
        </motion.a>
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-2">
          <div className="container mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => handleCopy("4648883930", "phone")}
                className="flex items-center gap-2 hover:text-[#D08700] transition-colors relative"
              >
                <Phone className="w-4 h-4" />
                <span>(464) 888-3930</span>
                {copyStatus === "phone" && (
                  <span className="absolute -bottom-8 left-0 bg-[#D08700] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                )}
              </button>
              <button 
                onClick={() => handleCopy("info@diamondridgellc.us", "email")}
                className="flex items-center gap-2 text-xs sm:text-sm hover:text-[#D08700] transition-colors relative"              >
                <Mail className="w-4 h-4" />
                <span>info@diamondridgellc.us</span>
                {copyStatus === "email" && (
                  <span className="absolute -bottom-8 left-0 bg-[#D08700] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                )}
              </button>
            <span className="hidden sm:flex items-center gap-2 text-xs sm:text-sm"> <MapPin className="w-4 h-4 text-[#D08700]" />                <a href="https://www.google.com/maps/search/?api=1&query=16733+Vicky+Lane+Orland+Hills+IL+60487" target="_blank" rel="noopener noreferrer" className="hover:text-[#D08700] transition-colors">
                  16733 Vicky Lane, Orland Hills, IL 60487
                </a>
              </span>
            </div>
          </div>
        </div>
        {/* Main Navigation */}
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <motion.img
                src={logo}
                alt="Diamond Ridge LLC"
                className="h-12 md:h-16"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <span
                    className={`transition-colors ${
                      location.pathname === item.path
                        ? "text-[#D08700] font-semibold"
                        : "text-gray-700 hover:text-[#D08700]"
                    }`}
                  >
                    {item.name}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#D08700]"
                    initial={{ scaleX: 0 }}
                    animate={{
                      scaleX: location.pathname === item.path ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-[#D08700] transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t overflow-hidden"
            >
              <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`block py-2 ${
                        location.pathname === item.path
                          ? "text-[#D08700] font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <main className="pt-32 md:pt-36">
        <Breadcrumb />
        <Outlet />
      </main>

      {showBackToTop && (
        <motion.button
          onClick={handleBackToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          className="fixed bottom-6 right-6 z-50 bg-[#D08700] p-4 rounded-full shadow-lg hover:bg-[#D08700]/90 transition-all duration-300 group"
        >
          <ChevronUp size={24} className="text-white" />
        </motion.button>
      )}

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img src={logo} alt="Diamond Ridge LLC" className="h-16 mb-4 brightness-0 invert" />
              <p className="text-gray-300 mb-4">
                Professional commercial maintenance services you can trust.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className="text-gray-300 hover:text-[#D08700] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-700">
                <Link
                  to="/privacy-policy"
                  className="text-gray-300 hover:text-[#D08700] transition-colors text-sm"
                >
                  Privacy Policy & Terms
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#D08700]" />
                <button 
                  onClick={() => handleCopy("+14648883930", "phone-f")}
                  className="hover:text-[#D08700] transition-colors relative"
                >
                  (464) 888-3930
                  {copyStatus === "phone-f" && (
                    <span className="absolute -top-8 left-0 bg-[#D08700] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-[#D08700]" />
                <button 
                  onClick={() => handleCopy("info@diamondridgellc.us", "email-f")}
                  className="hover:text-[#D08700] transition-colors relative text-left"
                >
                  info@diamondridgellc.us
                  {copyStatus === "email-f" && (
                    <span className="absolute -top-8 left-0 bg-[#D08700] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                  )}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#D08700]" />
                <a href="https://www.google.com/maps/search/?api=1&query=16733+Vicky+Lane+Orland+Hills+IL+60487" target="_blank" rel="noopener noreferrer" className="hover:text-[#D08700] transition-colors">
                  16733 Vicky Lane, Orland Hills, IL 60487
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
              <p className="text-gray-300 mb-4 text-sm">
                Get maintenance tips & updates from Diamond Ridge.
              </p>
              <Link
                to="/handybook"
                className="text-gray-300 hover:text-[#D08700] transition-colors text-sm inline-flex items-center gap-1 mb-4"
              >
                Read our HandyBook Blog →
              </Link>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#D08700] focus:border-transparent transition-all"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {newsletterStatus === "loading" ? (
                    <Loader className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                  Subscribe
                </motion.button>
                {newsletterStatus === "success" && (
                  <div className="mt-2 text-sm text-[#D08700] flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {newsletterMessage}
                  </div>
                )}
                {newsletterStatus === "error" && (
                  <div className="mt-2 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {newsletterMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© 2026 Diamond Ridge LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {showAdminPanel && <AdminPanel />}
    </div>
  );
}
