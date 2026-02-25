import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Sparkles,
  Building,
  Zap,
  ArrowRight,
  X,
  Loader
} from "lucide-react";
import { sendEmail, TEMPLATES } from "../utils/emailjs";

export function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Diamond Ridge LLC - (464) 888-3930"; const c = document.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href','https://diamondridgellc.us/contact');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Contact Diamond Ridge LLC for commercial maintenance services. Call (464) 888-3930 or visit us at 16733 Vicky Lane, Orland Hills, IL 60487. 24/7 emergency services available.");
    }
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
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
      from_email: formData.email,
      phone: formData.phone,
      subject: 'New Contact Message from ' + formData.name,
      message: formData.message,
      form_type: 'Contact Form',
      service: '',
      rating: '',
    };

    // Send email via EmailJS
    const result = await sendEmail(TEMPLATES.CONTACT, templateParams);

    setLoading(false);

    if (result.success) {
      setSubmitted(true);
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      }, 3000);
    } else {
      setError("Failed to send. Please try again or call us directly.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Address",
      content: "16733 Vicky Lane, Orland Hills, IL 60487",
      link: "https://maps.google.com/?q=16733+Vicky+Ln,+Orland+Hills,+IL+60487,+USA",
    },
    {
      icon: Phone,
      title: "Phone",
      content: "(464) 888-3930",
      link: "tel:4648883930",
    },
    {
      icon: Mail,
      title: "Email",
      content: "info@diamondridgellc.us",
      link: "mailto:info@diamondridgellc.us",
    },
    {
      icon: Clock,
      title: "Business Hours",
      content: "Monday - Sunday: 8:00 AM - 6:00 PM\n(24/7 Emergency services available)",
      link: null,
    },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black py-32 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-24 -right-24 w-96 h-96 bg-[#D08700]/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#D08700]/10 rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-[#D08700]/20 backdrop-blur-sm px-6 py-3 rounded-full mb-6 border border-[#D08700]/30"
            >
              <Sparkles className="w-5 h-5 text-[#D08700]" />
              <span className="text-[#D08700] font-semibold">Let's Connect</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl mb-6 text-white"
            >
              Get In <span className="text-[#D08700]">Touch</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Ready to transform your commercial space? We're here 24/7 to discuss your maintenance needs
            </motion.p>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute top-20 right-20 hidden lg:block"
            >
              <Phone className="w-12 h-12 text-[#D08700]/50" />
            </motion.div>
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute bottom-20 left-20 hidden lg:block"
            >
              <Mail className="w-12 h-12 text-[#D08700]/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Services Banner */}
      <section className="py-6 bg-gradient-to-r from-[#D08700] to-[#B07000] relative overflow-hidden">
        <motion.div
          animate={{ x: [-1000, 1000] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-white/5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)"
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 text-white text-center md:text-left"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-8 h-8" />
            </motion.div>
            <div>
              <span className="font-bold text-xl">24/7 Emergency Services Available</span>
              <span className="mx-3 hidden md:inline">•</span>
              <span className="block md:inline">Call Now: (464) 888-3930</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Contact Information</h2>
            <p className="text-xl text-gray-600">Multiple ways to reach our team</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="relative bg-gradient-to-br from-white via-white to-[#D08700]/5 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border-2 border-[#D08700]/10 hover:border-[#D08700]/50 group overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-[#D08700]/0 via-[#D08700]/0 to-[#D08700]/0 group-hover:from-[#D08700]/5 group-hover:via-[#D08700]/10 group-hover:to-[#D08700]/5 transition-all duration-500"
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
                
                {/* Sparkle Effect on Hover */}
                <motion.div
                  className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <Sparkles className="w-6 h-6 text-[#D08700]" />
                </motion.div>

                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-24 h-24 bg-gradient-to-br from-[#D08700]/20 to-[#D08700]/5 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-[#D08700] group-hover:to-[#B07000] transition-all duration-300 shadow-lg group-hover:shadow-[#D08700]/50"
                >
                  {/* Pulsing Ring Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl border-4 border-[#D08700]/0 group-hover:border-[#D08700]/30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                  <info.icon className="w-12 h-12 text-[#D08700] group-hover:text-white transition-colors duration-300" />
                </motion.div>
                
                <h3 className="font-bold text-2xl mb-3 relative z-10 group-hover:text-[#D08700] transition-colors">{info.title}</h3>
                {info.link ? (
                  <a
                    href={info.icon === Mail && info.link?.startsWith('mailto:') 
                      ? `https://mail.google.com/mail/?view=cm&fs=1&to=${info.link.replace('mailto:', '')}` 
                      : info.link}
                    target={info.icon === MapPin || info.icon === Mail ? "_blank" : undefined}
                    rel={info.icon === MapPin || info.icon === Mail ? "noopener noreferrer" : undefined}
                    className="relative z-10 text-gray-600 hover:text-[#D08700] transition-colors whitespace-pre-line block font-medium group-hover:font-semibold"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="relative z-10 text-gray-600 whitespace-pre-line font-medium group-hover:font-semibold group-hover:text-gray-700">{info.content}</p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl mb-4">Find Us</h2>
              <p className="text-xl text-gray-600">Visit our location in Orland Hills</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
              <iframe
                            src="https://www.google.com/maps?q=16733+Vicky+Ln,+Orland+Hills,+IL+60487,+USA,+Orland+Hills,+IL+60487&output=embed"
                width="100%"
                className="h-80 md:h-96"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Diamond Ridge LLC Location"
              />
            </div>
          </motion.div>

          {/* Contact Form & Info */}
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-3 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-10 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-br from-[#D08700] to-[#B07000] rounded-xl flex items-center justify-center"
                >
                  <MessageSquare className="w-6 h-6 text-white" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold hover:text-[#D08700] transition-colors cursor-default">Send us a Message</h2>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D08700] focus:border-[#D08700] transition-all bg-white"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D08700] focus:border-[#D08700] transition-all bg-white"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D08700] focus:border-[#D08700] transition-all bg-white"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D08700] focus:border-[#D08700] transition-all bg-white"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#D08700] focus:border-[#D08700] transition-all resize-none bg-white"
                      placeholder="Tell us about your maintenance needs..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-gradient-to-r from-[#D08700] to-[#B07000] text-white px-8 py-5 rounded-xl text-lg font-bold shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.1 }}
                    className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
                  >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </motion.div>
                  <h3 className="text-4xl font-bold mb-4 text-gray-900">Message Sent Successfully!</h3>
                  <p className="text-xl text-gray-600 mb-2">
                    Thank you for reaching out to Diamond Ridge LLC.
                  </p>
                  <p className="text-lg text-gray-500">
                    We'll get back to you within 24 hours.
                  </p>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                    className="mt-8 h-1.5 w-32 bg-gradient-to-r from-[#D08700] to-[#B07000] rounded-full mx-auto"
                  />
                </motion.div>
              )}
            </motion.div>

            {/* Additional Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Business Hours */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-[#D08700] to-[#B07000] rounded-2xl p-8 shadow-xl text-white"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Clock className="w-8 h-8" />
                  <h3 className="text-2xl font-bold">Business Hours</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-white/20">
                    <span className="font-semibold">Monday - Sunday</span>
                    <span className="text-lg">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      <span className="font-semibold">24/7 Emergency Services</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Quick Response */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-xl border-2 border-[#D08700]/20"
              >
                <h3 className="text-2xl font-bold mb-4">Quick Response Time</h3>
                <p className="text-gray-600 mb-4">
                  We pride ourselves on rapid response times for all inquiries and emergencies.
                </p>
                <div className="flex items-center gap-2 text-[#D08700] font-semibold">
                  <Sparkles className="w-5 h-5" />
                  <span>Average response: Under 2 hours</span>
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gray-900 rounded-2xl p-8 shadow-xl text-white"
              >
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-gray-300 mb-6">
                  For urgent maintenance issues, call us directly for immediate assistance.
                </p>
                <a href="tel:4648883930">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#D08700] text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Call (464) 888-3930
                  </motion.button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
