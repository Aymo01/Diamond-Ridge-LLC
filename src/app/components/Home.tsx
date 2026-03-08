import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, CheckCircle, Star, Shield, Clock, Award, DollarSign, Users, ThumbsUp } from "lucide-react";
import { ClientSlider } from "./ClientSlider";
import { useEffect } from "react";

export function Home() {
  useEffect(() => {
    document.title = "Diamond Ridge LLC | Commercial Maintenance Services - Orland Hills, IL";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Professional commercial maintenance services in Orland Hills, IL. HVAC, Electrical, Plumbing, and more. Licensed, insured, and available 24/7 for emergencies.");
    }
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Fully licensed and insured for all commercial services",
    },
    {
      icon: Clock,
      title: "24/7 Emergency",
      description: "Round-the-clock emergency maintenance support",
    },
    {
      icon: Award,
      title: "12+ Years Experience",
      description: "Proven track record serving major commercial brands",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, clear quotes upfront",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Trained professionals dedicated to quality",
    },
    {
      icon: ThumbsUp,
      title: "Satisfaction Guaranteed",
      description: "We don't stop until you're happy",
    },
  ];

  const stats = [
    { number: "1000+", label: "Projects Completed" },
    { number: "12+", label: "Years Experience" },
    { number: "24/7", label: "Support Available" },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video Background */}
      <section className="relative">
        {/* Gradient Base */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b2d] via-[#1a2433] to-[#0a0f1e] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(208,135,0,0.18),transparent_55%)] z-0" />

        {/* Video Layer */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-70 brightness-110"
        >
          <source src="https://cdn.pixabay.com/video/2024/09/27/233563_large.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay (lighter to keep video visible) */}
        <div className="absolute inset-0 bg-[rgba(10,15,30,0.35)] z-0" />
        
        {/* Hero Content */}
        <div className="relative min-h-[600px] flex items-center overflow-hidden">
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-block mb-4"
                >
                  <span className="bg-[#D08700]/10 text-[#D08700] px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-sm">
                    Professional Maintenance Services
                  </span>
                </motion.div>
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white"
                >
                  Excellence in{" "}
                  <span className="text-[#D08700]">Commercial</span> Maintenance
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-100 mb-8"
                >
                  Diamond Ridge LLC provides commercial maintenance services
                  to keep your business running smoothly.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link to="/quote">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D08700] text-white px-8 py-4 rounded-lg flex items-center gap-2 shadow-lg hover:bg-[#D08700]/90 transition-colors"
                    >
                      Request a Quote
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link to="/services">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-lg border-2 border-white/30 hover:border-[#D08700] hover:bg-white/20 transition-colors"
                    >
                      Our Services
                    </motion.button>
                  </Link>
                </motion.div>
                          <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="mt-8 text-white text-sm md:text-base tracking-[0.3em] uppercase font-bold bg-[#1a1005] rounded-full inline-flex items-center px-6 py-3 border-2 border-[#D08700] shadow-[0_0_20px_rgba(208,135,0,0.4)]"
                                      >
                                        <span className="text-[#D08700] mr-3">One Call.</span><span className="mx-3">One Ridge.</span><span className="text-[#D08700] ml-3">One Solution.</span>
                                      </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex justify-center mt-12 lg:mt-0 lg:absolute lg:bottom-8 lg:right-8 lg:z-20"
              >
                <motion.div 
                  className="relative bg-[#D08700] rounded-2xl p-1 shadow-2xl max-w-2xl w-full mx-4 lg:mx-0"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(208, 135, 0, 0.5)",
                      "0 0 40px rgba(208, 135, 0, 0.8)",
                      "0 0 20px rgba(208, 135, 0, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="bg-white rounded-xl relative px-[50px] py-[24px]">
                    {/* Floating Star Badge */}
                    <motion.div
                      animate={{ y: [0, -20, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute -top-3 -right-3 bg-white p-2.5 rounded-xl shadow-lg z-10"
                    >
                      <Star className="w-5 h-5 text-[#D08700] fill-[#D08700]" />
                    </motion.div>
                    
                    <div className="space-y-3 sm:space-y-4">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                          className="flex items-center gap-2 sm:gap-3"
                        >
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#D08700] flex-shrink-0" />
                          <span className="text-gray-700 text-xs sm:text-sm leading-tight">
                            {
                              [
                                "Licensed & Insured Professionals",
                                "Fast Response Time",
                                "Quality Guaranteed",
                                "Value for Money",
                              ][i - 1]
                            }
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Stats Section - now inside the video background container */}
        <div className="py-16 relative z-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center bg-[#192333]/30 backdrop-blur-md border-2 border-white/20 rounded-xl p-8 shadow-xl hover:bg-[#192333] hover:border-[#D08700]/50 transition-all"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="text-4xl md:text-5xl font-bold text-[#D08700] mb-2"
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-white font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Client Slider Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ClientSlider />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-4">Featured Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive commercial maintenance solutions for your business needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D08700] to-[#B07000] p-8 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4"
              >
                <Shield className="w-12 h-12" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">HVAC Services</h3>
              <p className="text-white/90">Complete heating & cooling solutions</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-[#D08700] p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4"
              >
                <Award className="w-12 h-12 text-[#D08700]" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">Electrical</h3>
              <p className="text-gray-600">Licensed electrical repairs & installations</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="group relative overflow-hidden rounded-2xl bg-white border-2 border-[#D08700] p-8 shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4"
              >
                <Clock className="w-12 h-12 text-[#D08700]" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">Plumbing</h3>
              <p className="text-gray-600">Expert plumbing services & repairs</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D08700] to-[#B07000] p-8 text-white shadow-xl hover:shadow-2xl transition-all"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="mb-4"
              >
                <ThumbsUp className="w-12 h-12" />
              </motion.div>
              <h3 className="text-2xl font-semibold mb-2">General Maintenance</h3>
              <p className="text-white/90">All-inclusive facility maintenance</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#D08700] text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-[#D08700]/90 transition-colors inline-flex items-center gap-2"
              >
                              View All 10 Services
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#D08700]">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get a free quote today and experience the Diamond Ridge difference
            </p>
            <Link to="/quote">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-[#D08700] px-10 py-5 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-shadow"
              >
                Request Your Free Quote
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
