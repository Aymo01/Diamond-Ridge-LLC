import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Send, CheckCircle, Loader, Home, RefreshCw, Clock, Calendar, FileText, X } from "lucide-react";
import { Link } from "react-router";
import { sendEmail, TEMPLATES } from "../utils/emailjs";

export function RequestQuote() {
  useEffect(() => {
    document.title = "Request a Free Quote | Diamond Ridge LLC"; const c = document.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href','https://diamondridgellc.us/quote');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Request a free quote for commercial maintenance services. Fast response within 24 hours. No obligation, detailed estimates for HVAC, electrical, plumbing, and more.");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    propertyType: "",
    description: "",
    urgency: "normal",
    preferredContact: "email",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Prepare template parameters for EmailJS
    const templateParams = {
      from_name: formData.name,
      company_name: formData.company || "N/A",
      from_email: formData.email,
      phone: formData.phone,
      service_type: formData.service,
      property_type: formData.propertyType,
      urgency: formData.urgency,
      preferred_contact: formData.preferredContact,
      message: formData.description,
      time: new Date().toLocaleString(),
    };

    // Send email via EmailJS
    const result = await sendEmail(TEMPLATES.QUOTE, templateParams);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError("Failed to send. Please try again or call (464) 888-3930.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const services = [
    "General Maintenance",
    "HVAC",
    "Electrical",
    "Plumbing",
    "Locksmith",
    "Drywall / Painting",
    "Tiles",
    "Window Washing",
    "Landscaping",
    "Parking Lot Sweeping/Striping",
    "Other",
  ];

  const propertyTypes = [
    "Office Building",
    "Retail Space",
    "Warehouse",
    "Restaurant",
    "Medical Facility",
    "Educational Facility",
    "Industrial",
    "Other",
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 to-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl mb-6"
            >
              Request a <span className="text-yellow-600">Free Quote</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Tell us about your project and we'll get back to you promptly
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Company */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="Your Company LLC"
                    />
                  </motion.div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="john@example.com"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </motion.div>
                </div>

                {/* Service & Property Type */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Property Type *
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select property type...</option>
                      {propertyTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>

                {/* Urgency & Preferred Contact */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Urgency
                    </label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="normal">Normal - Within a week</option>
                      <option value="urgent">Urgent - Within 48 hours</option>
                      <option value="emergency">Emergency - ASAP</option>
                    </select>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-gray-700 font-semibold mb-2">
                      Preferred Contact Method
                    </label>
                    <select
                      name="preferredContact"
                      value={formData.preferredContact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="email">Email</option>
                      <option value="phone">Phone</option>
                      <option value="either">Either</option>
                    </select>
                  </motion.div>
                </div>

                {/* Description */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-gray-700 font-semibold mb-2">
                    Project Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                    placeholder="Please describe your maintenance needs in detail..."
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request
                        <Send className="w-6 h-6" />
                      </>
                    )}
                  </motion.button>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-center gap-3 text-red-700"
                    >
                      <X className="w-5 h-5 flex-shrink-0" />
                      <p className="font-semibold">{error}</p>
                    </motion.div>
                  )}
                </motion.div>
              </form>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="py-12"
                >
                  {/* Animated Checkmark */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
                    className="flex justify-center mb-8"
                  >
                    <div className="relative">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-[#D08700] rounded-full opacity-20 blur-xl"
                      />
                      <CheckCircle className="w-32 h-32 text-[#D08700] relative z-10" />
                    </div>
                  </motion.div>

                  {/* Success Message */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900"
                  >
                    Quote Request Received!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
                  >
                    Thank you, <span className="font-bold text-[#D08700]">{formData.name}</span>! Our team will review your request and contact you within 24 hours via{" "}
                    <span className="font-bold text-[#D08700]">
                      {formData.preferredContact === "email"
                        ? "email"
                        : formData.preferredContact === "phone"
                        ? "phone"
                        : "email or phone"}
                    </span>.
                  </motion.p>

                  {/* What Happens Next */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 mb-12"
                  >
                    <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
                      What Happens Next?
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                      {[
                        {
                          icon: Clock,
                          step: "Step 1",
                          title: "We review your request",
                          description: "1-2 hours",
                          color: "from-[#D08700] to-[#B07000]",
                        },
                        {
                          icon: Calendar,
                          step: "Step 2",
                          title: "Site assessment scheduled",
                          description: "Within 24 hours",
                          color: "from-[#D08700] to-[#B07000]",
                        },
                        {
                          icon: FileText,
                          step: "Step 3",
                          title: "Detailed quote delivered",
                          description: "Within 48 hours",
                          color: "from-[#D08700] to-[#B07000]",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 + index * 0.1 }}
                          className="text-center"
                        >
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                          >
                            <item.icon className="w-10 h-10 text-white" />
                          </motion.div>
                          <p className="text-sm font-semibold text-[#D08700] mb-2">
                            {item.step}
                          </p>
                          <h4 className="font-bold text-lg mb-2 text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                  >
                    <Link to="/">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 justify-center"
                      >
                        <Home className="w-5 h-5" />
                        Return Home
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          company: "",
                          email: "",
                          phone: "",
                          service: "",
                          propertyType: "",
                          description: "",
                          urgency: "normal",
                          preferredContact: "email",
                        });
                      }}
                      className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200 flex items-center gap-3 justify-center"
                    >
                      <RefreshCw className="w-5 h-5" />
                      Submit Another Request
                    </motion.button>
                  </motion.div>
                </motion.div>
              </AnimatePresence>
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-12 grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "Fast Response",
                description: "We respond to all quote requests within 24 hours",
              },
              {
                title: "No Obligation",
                description: "Free quotes with no pressure or commitment",
              },
              {
                title: "Detailed Estimate",
                description: "Clear, itemized pricing for complete transparency",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-yellow-50 rounded-xl p-6 text-center"
              >
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
