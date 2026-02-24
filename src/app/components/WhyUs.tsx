import { motion } from "motion/react";
import {
  Shield,
  Clock,
  Award,
  DollarSign,
  Users,
  Star,
  CheckCircle,
  ThumbsUp,
  ChevronDown,
  Phone,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export function WhyUs() {
  useEffect(() => {
    document.title = "Why Choose Us | Diamond Ridge LLC - The Clear Choice";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Discover why 1000+ businesses trust Diamond Ridge LLC. Licensed & insured, 24/7 availability, 12+ years experience, competitive pricing, and expert team dedicated to excellence.");
    }
  }, []);

  const faqs = [
    {
      question: "What areas do you serve?",
      answer: "Diamond Ridge LLC proudly serves all 50 states across the United States, providing comprehensive commercial maintenance services to businesses nationwide.",
    },
    {
      question: "How fast do you respond to emergencies?",
      answer: "We offer 24/7 emergency support with typical on site response times of 2 to 4 hours for urgent commercial maintenance issues.",
    },
    {
      question: "Are you licensed and insured?",
      answer: "Yes. Diamond Ridge LLC is fully licensed and insured across all 50 states for all commercial maintenance services including HVAC, electrical, plumbing, and general maintenance.",
    },
    {
      question: "How do I get a quote?",
      answer: "Simply fill out our Request a Quote form online or call us at (464) 888-3930. We provide free, no-obligation estimates for all commercial maintenance projects.",
    },
    {
      question: "What types of properties do you service?",
      answer: "We service a wide range of commercial properties including retail stores, office buildings, warehouses, restaurants, medical facilities, and multiunit residential complexes.",
    },
    {
      question: "Do you offer maintenance contracts?",
      answer: "Yes, we offer customizable preventive maintenance contracts tailored to your facility needs, helping you reduce emergency costs and extend equipment lifespan.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const reasons = [
    {
      icon: ShieldCheck,
      title: "Licensed & Insured",
      description:
        "Fully licensed and insured for your protection and peace of mind. We meet all industry standards and regulations.",
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: Clock,
      title: "24/7 Availability",
      description:
        "Emergency services available around the clock. We're here when you need us most, day or night.",
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: Trophy,
      title: "12+ Years Experience",
      description:
        "Over 12 years of expertise in commercial maintenance. Our experience translates to better service for you.",
      color: "from-[#D08700] to-[#B07000]",
    },
    {
      icon: DollarSign,
      title: "Competitive Pricing",
      description:
        "Fair, transparent pricing with no hidden fees. Quality service that fits your budget.",
      color: "from-green-400 to-green-600",
    },
    {
      icon: Users,
      title: "Expert Team",
      description:
        "Highly trained professionals who take pride in their work. Every team member is committed to excellence.",
      color: "from-orange-400 to-orange-600",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description:
        "We stand behind our work with a satisfaction guarantee. Your happiness is our priority.",
      color: "from-pink-400 to-pink-600",
    },
  ];

  const advantages = [
    "Flexible scheduling to minimize disruption",
    "Detailed reporting and documentation",
    "Long term maintenance programs available",
    "Direct communication with project managers",
    "Customer satisfaction guarantee",
  ];

  const [showAdvantages, setShowAdvantages] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 relative overflow-hidden">
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
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="inline-block mb-4"
            >
              <span className="text-[#D08700] font-bold text-lg uppercase tracking-wider bg-[#D08700]/10 px-6 py-2 rounded-full">
                The Diamond Ridge Advantage
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              className="text-5xl md:text-7xl mb-6 font-bold"
            >
              Why <span className="text-[#D08700]">We're Different</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="text-xl md:text-2xl text-gray-300 leading-relaxed"
            >
              We don't just <span className="text-white font-bold">maintain</span> your property, we{" "}
              <span className="text-[#D08700] font-bold">elevate</span> it. Here's why 1000+ businesses trust us.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="text-[#D08700] font-bold text-lg mb-2 block uppercase tracking-wider"
            >
              What Makes Us Stand Out
            </motion.span>
            <h2 className="text-4xl md:text-6xl mb-4 font-bold">
              The <span className="text-[#D08700]">Six Pillars</span> of Excellence
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every service, every interaction, built on these foundational strengths
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ y: -15, scale: 1.03 }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-200 group relative overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1, type: "spring", duration: 0.4, bounce: 0.4 }}
                  whileHover={{ rotate: 360, scale: 1.2, transition: { duration: 0.3 } }}
                  className={`w-20 h-20 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 shadow-xl relative z-10`}
                >
                  <reason.icon className="w-10 h-10 text-white" />
                </motion.div>

                <h3 className="text-2xl font-bold mb-4 relative z-10 group-hover:text-[#D08700] transition-colors duration-200">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 mb-6">
                  {reason.description}
                </p>

                {/* Animated Accent Bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scaleY: 2 }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    delay: index * 0.05 + 0.2,
                    duration: 0.2,
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                  className={`h-1 rounded-full relative overflow-hidden cursor-pointer group/bar`}
                  style={{
                    background: `linear-gradient(90deg, rgba(234,179,8,0.3) 0%, rgba(234,179,8,0.7) 25%, rgba(234,179,8,1) 50%, rgba(202,138,4,1) 50%, rgba(202,138,4,0.7) 75%, rgba(202,138,4,0.3) 100%)`,
                    backgroundSize: "200% 100%",
                  }}
                >
                  {/* Shine effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D08700] to-transparent opacity-0 group-hover/bar:opacity-80"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Advantages */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#D08700] rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="text-[#D08700] font-bold text-lg mb-2 block uppercase tracking-wider"
            >
              But Wait, There's More
            </motion.span>
            <h2 className="text-4xl md:text-6xl mb-4 font-bold">
              Even <span className="text-[#D08700]">More Reasons</span> to Choose Us
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Because excellence is in the details, and we've thought of everything
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {advantages.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.2 }}
                  whileHover={{ x: 10, scale: 1.02 }}
                  className={`flex items-start gap-4 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/10 hover:border-[#D08700]/30 transition-all duration-200 group ${index === advantages.length - 1 ? 'md:col-span-2 md:max-w-xl md:mx-auto' : ''}`}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 + 0.1, type: "spring" }}
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    className="flex-shrink-0"
                  >
                    <CheckCircle className="w-7 h-7 text-[#D08700] mt-1" />
                  </motion.div>
                  <span className="text-gray-200 text-lg leading-relaxed group-hover:text-white transition-colors">
                    {advantage}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="py-20 bg-gradient-to-br from-[#D08700] to-[#B07000] text-white relative overflow-hidden">
        {/* Animated Background Circles */}
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
              whileHover={{ rotate: 360, scale: 1.2 }}
              className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
            >
              <ThumbsUp className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl mb-6 font-bold">Our Promise to You</h2>
            <p className="text-xl md:text-2xl text-yellow-50 mb-8 leading-relaxed">
              At Diamond Ridge LLC, we're not just service providers, we{" "}
              <span className="text-white font-bold">your partners in success</span>. 
              We understand that your facility is critical to your business operations, 
              and we treat every project with the urgency and care it deserves. Our commitment? 
              To deliver <span className="text-white font-bold">exceptional service, every single time</span>, 
              because your success is our success.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.08, y: -5 }}
              className="inline-flex items-center gap-3 bg-white text-gray-900 px-10 py-5 rounded-2xl text-xl font-bold shadow-2xl cursor-default"
            >
              <CheckCircle className="w-8 h-8 text-[#D08700]" />
              100% Satisfaction Guaranteed
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-[#D08700] rounded-full blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="text-[#D08700] font-bold text-lg mb-2 block uppercase tracking-wider"
            >
              Got Questions?
            </motion.span>
            <h2 className="text-4xl md:text-6xl mb-4 font-bold">
              FAQ<span className="text-[#D08700]">'s</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Everything you need to know about Diamond Ridge LLC
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
              >
                <motion.button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-white/10 transition-all duration-300 group"
                  whileHover={{ x: 5 }}
                >
                  <span className={`text-lg md:text-xl font-semibold pr-4 transition-colors duration-300 ${openFAQ === index ? "text-[#D08700]" : "text-white group-hover:text-[#D08700]"}`}>
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openFAQ === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${openFAQ === index ? "text-[#D08700]" : "text-gray-400"}`} />
                  </motion.div>
                </motion.button>
                
                <motion.div
                  initial={false}
                  animate={{
                    height: openFAQ === index ? "auto" : 0,
                    opacity: openFAQ === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: openFAQ === index ? 1 : 0, y: openFAQ === index ? 0 : -10 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#D08700] to-[#B07000] text-white relative overflow-hidden">
        {/* Animated Background Pattern */}
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
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl mb-6 font-bold">Ready to Experience the Difference?</h2>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed text-white/90">
              Join the 1000+ businesses who trust Diamond Ridge LLC for their commercial maintenance needs
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/quote">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
                >
                  Request a Quote
                </motion.button>
              </Link>
              
              <a href="tel:4648883930">
                <motion.button
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-900 text-white px-8 py-4 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all flex items-center gap-2"
                >
                  <Phone className="w-5 h-5" />
                  Call (464) 888-3930
                </motion.button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
