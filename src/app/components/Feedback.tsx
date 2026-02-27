import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Star, Send, CheckCircle, AlertCircle, MessageCircle, Heart, X, Loader } from "lucide-react";
import { sendEmail, TEMPLATES } from "../utils/emailjs";
import { getApprovedReviews, submitReview, type Review } from "../utils/supabaseReviews";

export function Feedback() {
  useEffect(() => {
    document.title = "Feedback & Reviews | Diamond Ridge LLC";
    const c = document.querySelector('link[rel="canonical"]');
    if (c) c.setAttribute('href', 'https://diamondridgellc.us/feedback');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Share your feedback, file a complaint, or leave a review for Diamond Ridge LLC. We value your input and continuously improve our commercial maintenance services.");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "feedback",
    rating: 0,
    service: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submittedType, setSubmittedType] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load reviews from Supabase
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const approvedReviews = await getApprovedReviews();
        // Sort by date, newest first, and take max 6
        const sortedReviews = approvedReviews
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6);
        setReviews(sortedReviews);
      } catch (e) {
        console.error("Error loading reviews:", e);
      }
    };
    loadReviews();
  }, [submitted]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    setSubmittedType(formData.type);
    
    // 1. Send email notification via EmailJS
    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone || "N/A",
      rating: formData.rating > 0 ? `${formData.rating}/5 stars` : "N/A",
      service: formData.service || "N/A",
      subject: formData.subject || 'New Feedback Submission from ' + formData.name,
      message: formData.message,
      form_type: formData.type === "feedback" ? "Customer Feedback" : formData.type === "complaint" ? "Complaint" : "Review",
    };

    const emailResult = await sendEmail(TEMPLATES.FEEDBACK, templateParams);
    
    if (emailResult.success) {
      // 2. If it's a review, save to Supabase
      if (formData.type === "review" && formData.rating > 0) {
        try {
          await submitReview({
            name: formData.name,
            rating: formData.rating,
            service: formData.service || "General Service",
            comment: formData.message,
          });
        } catch (err) {
          console.error("Failed to save review to Supabase:", err);
          // We still show success since the email went through, but log the error
        }
      }
      
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        type: "feedback",
        rating: 0,
        service: "",
        subject: "",
        message: "",
      });
    } else {
      setError("Failed to send feedback. Please try again.");
    }
    setLoading(false);
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

  const handleReset = () => {
    setSubmitted(false);
    setError("");
  };

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
              Your <span className="text-yellow-600">Feedback</span> Matters
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Help us improve by sharing your experience or concerns
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* What Our Clients Say - Dynamic Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl mb-4"
              >
                What Our <span className="text-[#D08700]">Clients Say</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-600"
              >
                Real reviews from our satisfied customers
              </motion.p>
            </div>

            {reviews.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center py-16 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-3xl shadow-2xl border-2 border-[#D08700]/30"
              >
                <div className="bg-[#D08700]/20 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Star className="w-12 h-12 text-[#D08700]" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Be the first to leave a review!
                </h3>
                <p className="text-gray-300 text-lg">
                  Share your experience with Diamond Ridge LLC
                </p>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {reviews.map((review, index) => (
                  <motion.div
                    key={review.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl shadow-xl p-6 border-2 border-[#D08700]/30"
                  >
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= review.rating
                              ? "text-[#D08700] fill-[#D08700]"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-white text-base mb-4 leading-relaxed">
                      "{review.comment}"
                    </p>
                    <div className="mb-4">
                      <span className="inline-block bg-[#D08700]/20 text-[#D08700] px-3 py-1 rounded-full text-sm font-semibold">
                        {review.service}
                      </span>
                    </div>
                    <div className="border-t border-[#D08700]/20 pt-4">
                      <p className="text-white font-bold text-lg">
                        {review.name}
                      </p>
                      <p className="text-gray-400 text-sm">
                        {new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-8 md:p-12"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6" id="feedback-form">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                  <label className="block text-gray-700 font-semibold mb-3 text-lg">
                    What would you like to share? *
                  </label>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { value: "feedback", label: "General Feedback", icon: MessageCircle },
                      { value: "complaint", label: "Complaint", icon: AlertCircle },
                      { value: "review", label: "Review", icon: Star },
                    ].map((option) => (
                      <motion.label
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        className={`flex flex-col items-center gap-2 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.type === option.value
                            ? "border-yellow-600 bg-yellow-50"
                            : "border-gray-300 hover:border-yellow-400"
                        }`}
                      >
                        <input
                          type="radio"
                          name="type"
                          value={option.value}
                          checked={formData.type === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <option.icon className="w-8 h-8 text-yellow-600" />
                        <span className="font-semibold">{option.label}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                {formData.type === "review" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-gray-700 font-semibold mb-2">Service Used *</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      required={formData.type === "review"}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                      <option value="General Maintenance">General Maintenance</option>
                      <option value="HVAC">HVAC</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Locksmith">Locksmith</option>
                      <option value="Drywall/Painting">Drywall/Painting</option>
                      <option value="Tiles">Tiles</option>
                      <option value="Window Washing">Window Washing</option>
                      <option value="Landscaping">Landscaping</option>
                      <option value="Parking Lot Sweeping/Striping">Parking Lot Sweeping/Striping</option>
                    </select>
                  </motion.div>
                )}

                {(formData.type === "feedback" || formData.type === "review") && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <label className="block text-gray-700 font-semibold mb-3">How would you rate your experience? *</label>
                    <div className="flex gap-2 justify-center md:justify-start">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          type="button"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setFormData({ ...formData, rating: star })}
                          onMouseEnter={() => setHoveredStar(star)}
                          onMouseLeave={() => setHoveredStar(0)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`w-10 h-10 transition-colors ${
                              star <= (hoveredStar || formData.rating)
                                ? "text-[#D08700] fill-[#D08700]"
                                : "text-gray-300"
                            }`}
                          />
                        </motion.button>
                      ))}
                    </div>
                    {formData.rating > 0 && (
                      <p className="text-sm text-gray-600 mt-2">
                        {formData.rating === 5 && "Excellent! We're thrilled!"}
                        {formData.rating === 4 && "Great! Thank you!"}
                        {formData.rating === 3 && "Good. We appreciate your feedback."}
                        {formData.rating === 2 && "We can do better. Please tell us more."}
                        {formData.rating === 1 && "We're sorry. Let us make it right."}
                      </p>
                    )}
                  </motion.div>
                )}

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder={formData.type === "complaint" ? "Brief description of your concern" : "What is this about?"}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {formData.type === "complaint" ? "Complaint Details" : "Your Message"} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                    placeholder={formData.type === "complaint" ? "Please provide as much detail as possible about your concern..." : "Share your thoughts with us..."}
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Privacy Notice:</strong> Your information will be kept confidential and used only to respond to your {formData.type}.
                  </p>
                </div>

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
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      Submit {formData.type === "complaint" ? "Complaint" : formData.type === "review" ? "Review" : "Feedback"}
                      <Send className="w-6 h-6" />
                    </>
                  )}
                </motion.button>

                {error && (
                  <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg flex items-center gap-3 text-red-700">
                    <X className="w-5 h-5 flex-shrink-0" />
                    <p className="font-semibold">{error}</p>
                  </motion.div>
                )}
              </form>
            ) : (
              <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: "spring" }} className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
                
                {submittedType === "review" ? (
                  <>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Thank You for Your Review!</h3>
                    <p className="text-xl text-gray-600 mb-4">Your feedback helps us improve and serves as a testament to our work.</p>
                    <p className="text-sm text-gray-500">Your review will appear here after admin approval.</p>
                  </>
                ) : submittedType === "complaint" ? (
                  <>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Complaint Received</h3>
                    <p className="text-xl text-gray-600">We take all complaints seriously and will respond within 24 hours.</p>
                  </>
                ) : (
                  <>
                    <h3 className="text-3xl font-bold mb-4 text-gray-900">Feedback Received!</h3>
                    <p className="text-xl text-gray-600">Thank you for helping us improve our services.</p>
                  </>
                )}
                
                <motion.button onClick={handleReset} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all">
                  Submit Another
                </motion.button>
              </motion.div>
            )}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-12 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-semibold mb-4">Have an urgent concern?</h3>
              <p className="text-gray-300 mb-6">For immediate assistance or urgent complaints, please call us directly.</p>
              <a href="tel:4648883930">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-700 transition-colors">
                  Call Us: (464) 888-3930
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
