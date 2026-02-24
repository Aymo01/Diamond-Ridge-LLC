import { motion } from "motion/react";
import {
  Wrench,
  Droplets,
  Zap,
  Wind,
  Key,
  Paintbrush,
  Grid3x3,
  Sparkles,
  Trees,
  CarFront,
  CheckCircle,
} from "lucide-react";
import { Link } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useEffect } from "react";
import locksmithImg from "@/assets/Locksmith.png";
import hvacImg from "@/assets/HVAC.png";
import pressureWashingImg from "@/assets/PressureWashing.jpg";

export function Services() {
  // v2 - force rebuild
  useEffect(() => {
    document.title = "Our Services | Diamond Ridge LLC - HVAC, Electrical, Plumbing & More"; const c = document.querySelector('link[rel="canonical"]'); if(c) c.setAttribute('href','https://diamondridgellc.us/services');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Complete commercial maintenance services: General Maintenance, HVAC, Electrical, Plumbing, Locksmith, Drywall/Painting, Flooring, Pressure Washing, and Landscaping.");
    }
  }, []);

  const services = [
    {
      icon: Wrench,
      title: "General Maintenance",
      description:
        "Comprehensive facility management solutions ensuring your commercial property operates at peak efficiency. We provide routine inspections, preventive maintenance programs, and rapid emergency response services to minimize downtime and extend the life of your building systems and infrastructure.",
      features: [
        "Regular facility inspections",
        "Preventive maintenance programs",
        "Trash collection & Cleaning Services",
        "Dumpster management",
        "Sidewalk surface cleaning",
        "Equipment servicing",
        "Parking lot sweeping & cleaning",
        "Cold patch & hot patch asphalt repair",
        "Door & window repairs",
        "Furniture assembly & installation",
        "Shelving & storage solutions",
        "Caulking & weatherproofing",
        "Gutter cleaning & repair",
        "Signage installation & repair",
      ],
      image: "https://images.unsplash.com/photo-1620825141088-a824daf6a46b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwbWFpbnRlbmFuY2UlMjB0b29scyUyMGVxdWlwbWVudHxlbnwxfHx8fDE3NzE0MTQzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
    {
      icon: Wind,
      title: "HVAC",
      description: "Expert heating, ventilation, and air conditioning services designed to maintain optimal indoor climate control for your commercial facility. Our certified technicians provide comprehensive system installation, maintenance, and repair services to ensure energy efficiency, air quality, and year round comfort for your employees and customers.",
      features: [
        "AC installation, maintenance & repair",
        "Commercial heating system service",
        "Complete HVAC system installation",
        "Indoor air quality solutions",
        "Energy efficiency assessments",
      ],
      image: hvacImg,
      useImageTag: true,
    },
    {
      icon: Zap,
      title: "Electrical",
      description: "Professional electrical services performed by licensed electricians to keep your commercial property powered safely and efficiently. From routine maintenance and upgrades to complex installations and emergency repairs, we handle all aspects of commercial electrical work with precision and compliance to all safety codes and regulations.",
      features: [
        "Commercial lighting solutions",
        "Electrical repairs & troubleshooting",
        "Panel upgrades & replacements",
        "Safety inspections & code compliance",
        "Energy-efficient lighting retrofits",
      ],
      image: "https://images.unsplash.com/photo-1467733238130-bb6846885316?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2FsJTIwY29tbWVyY2lhbCUyMHdpcmluZyUyMHdvcmt8ZW58MXx8fHwxNzcxNDE0MzY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
    {
      icon: Droplets,
      title: "Plumbing",
      description: "Complete plumbing solutions for commercial properties, from routine maintenance to complex installations and emergency repairs. Our experienced plumbers ensure your facility's water systems operate flawlessly, preventing costly water damage and maintaining sanitary conditions throughout your building with minimal disruption to your business operations.",
      features: [
        "Sump pump inspection & repair",
        "Ceiling leak inspection & repair",
        "Clogged drain lines & mainline jetting",
        "Leak detection & repair services",
        "Professional drain cleaning",
        "Fixture installation & replacement",
        "Water heater service & installation",
        "Pipe repair & re-piping",
        "Backflow prevention & testing",
      ],
      image: "https://images.unsplash.com/photo-1702146715426-2380c6ad54c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmluZyUyMHBpcGVzJTIwY29tbWVyY2lhbCUyMHJlcGFpcnxlbnwxfHx8fDE3NzE0MTQzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
    {
      icon: Key,
      title: "Locksmith",
      description: "Professional commercial locksmith services to protect your business assets and ensure the security of your facility. Our skilled locksmiths provide rapid response for lockouts, security upgrades, master key systems, and access control solutions tailored to your commercial property's unique security needs.",
      features: [
        "Sliding door & pull door inspection / repair",
        "Air force door troubleshooting & repair",
        "Door latches replacement (ground saver bins)",
        "Broken blinds / rollers / chains repair",
        "Lock installation & repair",
        "Key duplication & master key systems",
        "High-security lock upgrades",
        "Access control systems",
        "Safe installation & service",
      ],
      image: locksmithImg,
      useImageTag: true,
    },
    {
      icon: Paintbrush,
      title: "Drywall / Painting",
      description: "Professional interior and exterior painting services combined with expert drywall installation and repair to transform and maintain your commercial space. Our skilled craftsmen deliver flawless finishes that enhance your property's appearance, protect surfaces from wear, and create a professional environment that impresses clients and employees alike.",
      features: [
        "Drywall repair & installation",
        "Interior & exterior painting",
        "Professional surface preparation",
        "Color consultation & design",
        "Parking lot striping & marking",
        "ADA compliance striping",
      ],
      image: "https://images.unsplash.com/photo-1770993189421-24f88a309320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkcnl3YWxsJTIwcGFpbnRpbmclMjBpbnRlcmlvciUyMGNvbW1lcmNpYWx8ZW58MXx8fHwxNzcxNDE0MzY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
    {
      icon: Grid3x3,
      title: "Flooring",
      description: "Comprehensive flooring solutions for commercial properties including tile, carpentry, concrete, and masonry work. Our experienced flooring specialists deliver durable, aesthetically pleasing surfaces that withstand heavy commercial traffic while enhancing the professional appearance of your facility. From repairs to complete installations, we handle all flooring needs with precision and attention to detail.",
      features: [
        "Tile installation & repair",
        "Custom carpentry work",
        "Concrete finishing & polishing",
        "Masonry services",
        "Floor restoration & refinishing",
        "Grout cleaning & sealing",
      ],
      image: "https://images.unsplash.com/photo-1583953458882-302655b5c376?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWxlJTIwZmxvb3JpbmclMjBpbnN0YWxsYXRpb24lMjBjb21tZXJjaWFsfGVufDF8fHx8MTc3MTQxNDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
    {
      icon: Sparkles,
      title: "Pressure Washing",
      description: "Professional pressure washing services to restore and maintain the pristine appearance of your commercial property. Using industrial-grade equipment and eco-friendly cleaning solutions, we remove dirt, grime, mold, and stains from building exteriors, walkways, parking areas, and more. Our window cleaning services ensure crystal-clear views and a spotless professional image that makes a lasting impression.",
      features: [
        "Building exterior pressure washing",
        "Parking lot & sidewalk cleaning",
        "Window cleaning (interior & exterior)",
        "Power washing surfaces",
        "Graffiti removal",
        "Gum & stain removal",
        "Regular maintenance programs",
      ],
      image: pressureWashingImg,
      useImageTag: true,
    },
    {
      icon: Trees,
      title: "Landscaping",
      description: "Complete commercial landscaping services to create and maintain beautiful outdoor spaces that enhance your property's curb appeal and provide a welcoming environment for clients and employees. Our skilled landscaping team delivers comprehensive maintenance programs, seasonal services, and design solutions tailored to your property's unique needs and your business's professional image.",
      features: [
        "Professional lawn maintenance & mowing",
        "Tree & shrub trimming & pruning",
        "Seasonal cleanup services",
        "Landscape design & installation",
        "Irrigation system maintenance",
        "Mulching & fertilization",
      ],
      image: "https://images.unsplash.com/photo-1741527694859-925f4a4ec88e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwbGFuZHNjYXBpbmclMjBsYXduJTIwbWFpbnRlbmFuY2V8ZW58MXx8fHwxNzcxNDE0MzY3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      useImageTag: false,
    },
  ];

  return (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-yellow-50 via-white to-gray-50 py-24 overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-20 w-64 h-64 bg-yellow-200 rounded-full opacity-20 blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-10 w-80 h-80 bg-yellow-300 rounded-full opacity-15 blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="bg-yellow-500 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                9 Specialized Services
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl mb-6"
            >
              Complete <span className="text-yellow-600">Commercial</span>
              <br />
              Maintenance <span className="text-yellow-600">Solutions</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed"
            >
              From HVAC to landscaping, we've got every aspect of your facility covered.
              <br />
              <span className="text-gray-900 font-semibold">One call, endless solutions.</span>
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-xl hover:shadow-2xl transition-all"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all border-2 border-gray-200"
                >
                  Talk to an Expert
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D08700] font-semibold text-lg mb-2 block">
              WHAT WE DO BEST
            </span>
            <h2 className="text-4xl md:text-5xl mb-4">
              Our <span className="text-[#D08700]">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every service delivered with precision, professionalism, and a commitment to excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link to="/contact" key={index} className="block group">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border-2 border-transparent hover:border-[#D08700] cursor-pointer h-full flex flex-col relative"
                >
                  {/* Service Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                    >
                      {service.useImageTag ? (
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-56 object-cover"
                        />
                      ) : (
                        <ImageWithFallback
                          src={service.image}
                          alt={service.title}
                          className="w-full h-56 object-cover"
                        />
                      )}
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Animated Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="absolute bottom-4 left-4 w-16 h-16 bg-[#D08700] rounded-2xl flex items-center justify-center shadow-xl"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                  </div>

                  {/* Service Content */}
                  <div className="p-6 flex-1">
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D08700] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center gap-3 text-gray-700"
                        >
                          <CheckCircle className="w-5 h-5 text-[#D08700] flex-shrink-0" />
                          <span className="text-sm font-medium">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#D08700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 50,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-0 right-0 w-96 h-96 bg-[#D08700] rounded-full opacity-5 blur-3xl"
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#D08700] font-semibold text-lg mb-2 block">
              HOW IT WORKS
            </span>
            <h2 className="text-4xl md:text-5xl mb-4">
              From <span className="text-[#D08700]">Contact</span> to <span className="text-[#D08700]">Completion</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              A seamless process designed for your convenience and peace of mind
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Contact Us",
                description: "Reach out via phone or our online form",
                color: "bg-gradient-to-br from-[#D08700] to-[#B07200]"
              },
              {
                step: "02",
                title: "Assessment",
                description: "We evaluate your needs and provide a quote",
                color: "bg-gradient-to-br from-[#D08700] to-[#B07200]"
              },
              {
                step: "03",
                title: "Execution",
                description: "Our team delivers quality service",
                color: "bg-gradient-to-br from-[#D08700] to-[#B07200]"
              },
              {
                step: "04",
                title: "Follow-up",
                description: "We ensure your complete satisfaction",
                color: "bg-gradient-to-br from-[#D08700] to-[#B07200]"
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  whileHover={{ scale: 1.1 }}
                  className={`w-24 h-24 ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-3xl font-bold shadow-2xl group-hover:shadow-[#D08700]/50 transition-all`}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-[#D08700] transition-colors">
                  {item.title === "Contact Us" ? (
                    <Link to="/contact" className="hover:underline">
                      {item.title}
                    </Link>
                  ) : item.title === "Assessment" ? (
                    <Link to="/quote" className="hover:underline">
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D08700]/20 to-transparent -z-10" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden"
          >
            {/* Animated Elements */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{ 
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ 
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl"
            />
            <div className="relative z-10">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-6xl mb-6 font-bold"
              >
                Ready to Experience Excellence?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl md:text-2xl text-yellow-50 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                Join hundreds of satisfied clients who trust Diamond Ridge for all their
                commercial maintenance needs. Let's build something great together.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4"
              >
                <Link to="/quote">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-yellow-600 px-10 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Get Your Free Quote Today
                  </motion.button>
                </Link>
                <a href="tel:4648883930">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gray-900 text-white px-10 py-5 rounded-xl text-lg font-bold shadow-2xl hover:shadow-3xl transition-all"
                  >
                    Call Us: (464) 888-3930
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
