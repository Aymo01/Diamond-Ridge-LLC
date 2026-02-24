import { motion } from "motion/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import client logos
import bathBodyWorksLogo from "@/assets/Bath&bodylogo.png";
import burlingtonLogo from "@/assets/Burlingtonlogo.png";
import carvanaLogo from "@/assets/Carvanalogo.png";
import chipotleLogo from "@/assets/Chipotlelogo.png";
import dollarGeneralLogo from "@/assets/DollarGenerallogo.png";
import dollarTreeLogo from "@/assets/DollarTreelogo.png";
import gapLogo from "@/assets/Gaplogo.png";
import hertzLogo from "@/assets/Hertzlogo.png";
import starbucksLogo from "@/assets/Starbuckslogo.png";
import targetLogo from "@/assets/Targetlogo.png";
import tractorSupplyLogo from "@/assets/Tractorsupplylogo.png";
import walgreensLogo from "@/assets/Walgreenslogo.png";
import walmartLogo from "@/assets/Walmartlogo.png";

interface ClientSliderProps {
  showHeader?: boolean;
  className?: string;
}

export function ClientSlider({ showHeader = true, className = "" }: ClientSliderProps) {
  // Client logos data
  const clientLogos = [
    { name: "Bath & Body Works", logo: bathBodyWorksLogo },
    { name: "Burlington", logo: burlingtonLogo },
    { name: "Carvana", logo: carvanaLogo },
    { name: "Chipotle", logo: chipotleLogo },
    { name: "Dollar General", logo: dollarGeneralLogo },
    { name: "Dollar Tree", logo: dollarTreeLogo },
    { name: "Gap Inc.", logo: gapLogo },
    { name: "Hertz", logo: hertzLogo },
    { name: "Starbucks", logo: starbucksLogo },
    { name: "Target", logo: targetLogo },
    { name: "Tractor Supply Co", logo: tractorSupplyLogo },
    { name: "Walgreens", logo: walgreensLogo },
    { name: "Walmart", logo: walmartLogo },
  ];

  // Client logos slider settings
  const clientSliderSettings = {
    dots: false,
    infinite: true,
    speed: 3000,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className={className}>
      {showHeader && (
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            Our <span className="text-yellow-600">Clients</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600"
          >
            Trusted by leading brands across industries
          </motion.p>
        </div>
      )}
      <div className="py-12 px-4">
        <Slider {...clientSliderSettings}>
          {clientLogos.map((client) => (
            <div key={client.name} className="px-2 sm:px-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center h-24 sm:h-28 md:h-32"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className={`${
                    client.name === "Dollar Tree" 
                      ? "w-32 h-18 sm:w-36 sm:h-20 md:w-40 md:h-22" 
                      : "w-28 h-14 sm:w-32 sm:h-16 md:w-36 md:h-18"
                  } object-contain transition-all duration-300`}
                />
              </motion.div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
