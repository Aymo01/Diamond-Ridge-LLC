import { motion } from "motion/react";
import { Users, Award, Target, Heart, Calendar, TrendingUp, Building2, Globe, Sparkles } from "lucide-react";
import { useEffect } from "react";

export function About() {
  useEffect(() => {
    document.title = "About Us | Diamond Ridge LLC - Trusted Since 2012";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Learn about Diamond Ridge LLC - 12+ years of commercial maintenance excellence in Orland Hills, IL. Serving Fortune 500 companies and businesses nationwide since 2012.");
    }
  }, []);

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for perfection in every project we undertake",
    },
    {
      icon: Heart,
      title: "Integrity",
      description: "Honest, transparent communication and ethical practices",
    },
    {
      icon: Users,
      title: "Teamwork",
      description: "Collaborative approach with clients and team members",
    },
    {
      icon: Target,
      title: "Commitment",
      description: "Dedicated to delivering results that exceed expectations",
    },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white via-gray-50 to-white py-20">
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
              About <span className="text-[#D08700]">Diamond Ridge LLC</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600"
            >
              Your trusted partner in commercial maintenance excellence
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-[#D08700] font-semibold text-lg mb-2 block">
                  THE DIAMOND RIDGE DIFFERENCE
                </span>
                <h2 className="text-4xl md:text-5xl mb-6">
                  Built on <span className="text-[#D08700]">Trust</span>, Driven by{" "}
                  <span className="text-[#D08700]">Excellence</span>
                </h2>
              </motion.div>
              <div className="space-y-6 text-gray-600 text-lg">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="leading-relaxed"
                >
                  We didn't just start a maintenance company, we started a{" "}
                  <span className="text-gray-900 font-semibold">promise</span>. A promise to deliver
                  exceptional commercial maintenance services that businesses can truly depend on.
                  From our roots in Orland Hills, Illinois, we've become the{" "}
                  <span className="text-gray-900 font-semibold">trusted partner</span> for leading
                  brands nationwide.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="leading-relaxed"
                >Our team doesn't just bring expertise, we bring . Every project, from emergency repairs to comprehensive maintenance programs, receives the same level of dedication and precision that's made us the go to choice for Fortune companies and local businesses alike.<span className="text-gray-900 font-semibold">passion</span></motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="leading-relaxed"
                >
                  <span className="text-gray-900 font-semibold">Your success is our mission</span>.
                  We don't just maintain facilities, we protect your business operations, enhance
                  your property value, and give you peace of mind knowing everything is in expert
                  hands.
                </motion.p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="bg-[#D08700] rounded-2xl p-2 shadow-2xl"
              >
                <div className="bg-white rounded-xl p-8">
                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ x: 10 }}
                      className="cursor-default"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="text-5xl font-bold text-[#D08700] mb-2"
                      >
                        12+
                      </motion.div>
                      <div className="text-gray-700 font-semibold text-lg">Years of Excellence</div>
                      <div className="text-gray-500 text-sm mt-1">Industry leadership since day one</div>
                    </motion.div>
                    <div className="border-t-2 border-gray-100" />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ x: 10 }}
                      className="cursor-default"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="text-5xl font-bold text-[#D08700] mb-2"
                      >
                        500+
                      </motion.div>
                      <div className="text-gray-700 font-semibold text-lg">
                        Trusted Partnerships
                      </div>
                      <div className="text-gray-500 text-sm mt-1">Leading brands choose us</div>
                    </motion.div>
                    <div className="border-t-2 border-gray-100" />
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 }}
                      whileHover={{ x: 10 }}
                      className="cursor-default"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6, type: "spring" }}
                        className="text-5xl font-bold text-[#D08700] mb-2"
                      >
                        24/7
                      </motion.div>
                      <div className="text-gray-700 font-semibold text-lg">Support Available</div>
                      <div className="text-gray-500 text-sm mt-1">Always here when you need us</div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  scale: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-[#D08700] rounded-full opacity-20 blur-xl"
              />
              <motion.div
                animate={{ 
                  rotate: -360,
                  scale: [1, 1.3, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#D08700] rounded-full opacity-20 blur-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#D08700] rounded-full opacity-10 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.4, 1]
          }}
          transition={{ 
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-0 left-0 w-96 h-96 bg-[#D08700] rounded-full opacity-10 blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-[#D08700] font-bold text-lg mb-2 block uppercase tracking-wider"
            >
              What Drives Us
            </motion.span>
            <h2 className="text-4xl md:text-6xl mb-4 font-bold">
              The <span className="text-[#D08700]">Heart</span> of Diamond Ridge
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              These aren't just words on a wall, they're the <span className="text-white font-semibold">foundation</span> of every decision we make, every service we deliver
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
                whileHover={{ y: -15, scale: 1.05, transition: { duration: 0.15 } }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-2xl text-center group hover:shadow-[#D08700]/20 transition-all duration-150"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.1, type: "spring", duration: 0.3, bounce: 0.4 }}
                  whileHover={{ rotate: 360, scale: 1.2, transition: { duration: 0.2 } }}
                  className="w-20 h-20 bg-[#D08700] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:shadow-[#D08700]/50 transition-all duration-150"
                >
                  <value.icon className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#D08700] transition-colors duration-150">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-base">
                  {value.description}
                </p>
                
                {/* Bottom Accent Bar */}
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 + 0.2, duration: 0.2 }}
                  className="mt-6 h-1 bg-[#D08700] rounded-full"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white" />
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-[#D08700] rounded-full blur-3xl opacity-30"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-[#D08700] font-bold text-lg mb-2 block uppercase tracking-wider"
            >
              Our Compass
            </motion.span>
            <h2 className="text-4xl md:text-6xl mb-4 font-bold">
              Where We're <span className="text-[#D08700]">Going</span>, Why We're <span className="text-[#D08700]">Here</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="relative bg-gradient-to-br from-[#E8A640] to-[#D08700] rounded-3xl p-10 text-white shadow-2xl hover:shadow-[#D08700]/30 transition-all group overflow-hidden"
            >
              {/* Animated Background Circle */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-2xl"
              />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-xl"
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg text-white/90 leading-relaxed">
                  To <span className="text-white font-bold">revolutionize</span> commercial maintenance by delivering services that don't just meet expectations, they{" "}
                  <span className="text-white font-bold">shatter them</span>. Through unmatched quality, lightning fast response times, and a genuine commitment to your success, we're not just maintaining buildings, we're{" "}
                  <span className="text-white font-bold">empowering businesses</span> to focus on what they do best.
                </p>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scaleY: 2 }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  className="mt-8 h-1 rounded-full relative overflow-hidden cursor-pointer group"
                  style={{
                    background: "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.6) 25%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 75%, rgba(255,255,255,0.2) 100%)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  {/* Shine effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-60"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -10 }}
              className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-10 text-white shadow-2xl hover:shadow-gray-900/50 transition-all group overflow-hidden"
            >
              {/* Animated Background Circle */}
              <motion.div
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute bottom-0 left-0 w-64 h-64 bg-[#D08700] rounded-full blur-2xl"
              />
              
              <div className="relative z-10">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.8 }}
                  className="w-16 h-16 bg-[#D08700]/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 shadow-xl"
                >
                  <Award className="w-8 h-8 text-[#D08700]" />
                </motion.div>
                
                <h3 className="text-4xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  To become the <span className="text-[#D08700] font-bold">undisputed leader</span> in commercial maintenance, the name that comes to mind when businesses think of{" "}
                  <span className="text-white font-bold">excellence</span>, <span className="text-white font-bold">reliability</span>, and{" "}
                  <span className="text-white font-bold">innovation</span>. We're building a future where every business, from local shops to Fortune 500 giants, has access to{" "}
                  <span className="text-[#D08700] font-bold">world class maintenance</span> that drives their success forward.
                </p>
                
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scaleY: 2 }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    delay: 0.3,
                    duration: 0.3,
                    backgroundPosition: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }
                  }}
                  className="mt-8 h-1 rounded-full relative overflow-hidden cursor-pointer group"
                  style={{
                    background: "linear-gradient(90deg, rgba(208,135,0,0.3) 0%, rgba(208,135,0,0.7) 25%, rgba(208,135,0,1) 50%, rgba(208,135,0,0.7) 75%, rgba(208,135,0,0.3) 100%)",
                    backgroundSize: "200% 100%",
                  }}
                >
                  {/* Shine effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-[#D08700] to-transparent opacity-0 group-hover:opacity-80"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}