
// import Slider from "react-slick";
// import Link from "next/link";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const slides = [
//   {
//     image: "https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner_554907-284.jpg",
//     title: "Powerful Laptops",
//     subtitle: "Work and play without limits",
//     link: "/products/laptops",
//   },
//   {
//     image: "https://img.freepik.com/free-vector/electronics-store-template-design_23-2151143839.jpg",
//     title: "Desktop Machines",
//     subtitle: "Built for performance",
//     link: "/products/computers",
//   },
// ];

// export default function HeroCarousel() {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 600,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     arrows: false,
//   };

//   return (
//     <section className="w-full h-[90vh] relative">
//       <Slider {...settings}>
//         {slides.map((slide, index) => (
//           <div key={index} className="relative h-[90vh] w-full">
//             <img
//               src={slide.image}
//               alt={slide.title}
//               className="object-cover w-full h-full brightness-50"
//             />
//             <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
//               <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
//               <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
//               <Link
//                 href={slide.link}
//                 className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-full text-lg transition"
//               >
//                 Explore
//               </Link>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </section>
//   );
// }

"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-[50%] md:w-full h-[90vh] bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner_554907-284.jpg" // optional background image
          alt="Electronics background"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-yellow-300 text-5xl md:text-6xl font-bold mb-4"
        >
          Upgrade Your Tech Life
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gray-300 text-xl md:text-2xl mb-6 max-w-2xl"
        >
          Discover top deals on laptops, desktops, accessories, and more.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link
            href="/products"
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full text-lg transition"
          >
            Shop Now
          </Link>
        </motion.div> */}
      </div>
    </section>
  );
}

