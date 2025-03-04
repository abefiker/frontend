// "use client"; // Required in Next.js 13+ for client-side functionality

// import { useState } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight } from 'lucide-react'
// import Search from './Search'
// const images = [
//   {
//     src: "/image/carousel/TheaterShow.jpg",
//     title: "Hulum Tarik alew",
//     description: "Romantic , thriller and Drama",
//   },
//   {
//     src: "/image/carousel/TheaterShowBalochEnaMistoch.jpg",
//     title: "Baloch Ena Mistoch",
//     description: "A historical drama showcasing the struggles of a lost era.",
//   },
//   {
//     src: "/image/carousel/TheaterShowBe'aluGirma.jpg",
//     title: "Be'alu Girma",
//     description: "A heartwarming tale of friendship and perseverance.",
//   },
//   {
//     src: "/image/carousel/TheaterShowBe'aluGirma.jpg",
//     title: "Be'alu Girma 2",
//     description: "The continuation of a powerful and inspiring story.",
//   },
//   {
//     src: "/image/carousel/TheaterShowBe'aluGirma.jpg",
//     title: "Be'alu Girma 3",
//     description: "The final chapter in an unforgettable saga.",
//   },
// ];

// export default function Carousel() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const goToPrevious = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
//   };

//   const goToNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
//   };

//   return (
//     <div className="relative w-full">
//       <div className="absolute left-1/2 transform -translate-x-1/2 top-5 z-20 w-full max-w-lg">
//         <Search />
//       </div>
//       <div className="relative h-56 md:h-96 overflow-hidden">
//         {images.map((image, index) => (
//           <div key={index} className={index === currentIndex ? "block" : "hidden"}>
//             <Image
//               src={image.src}
//               alt={image.title}
//               width={1200}
//               height={600}
//               className="w-full h-full object-cover"
//             />
//             <div className="absolute bottom-2 left-4  bg-opacity-60 text-white p-4 rounded-md shadow-lg max-w-sm">
//               <h1 className="text-lg md:text-2xl font-bold">{image.title}</h1>
//               <p className="text-sm md:text-base mt-1">{image.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Indicators */}
//       <div className="absolute bottom-5 left-1/2 flex space-x-3 -translate-x-1/2">
//         {images.map((_, index) => (
//           <button
//             type="button"
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full ${index === currentIndex ? "bg-[#FF6347]" : "bg-white"}`}
//           />
//         ))}
//       </div>

//       {/* Controls */}
//       <button type='button' onClick={goToPrevious} className="absolute top-1/2 left-4 -translate-y-1/2 p-2">
//         <ChevronLeft size={40} className="text-[#FF6347] cursor-pointer" />
//       </button>
//       <button type="button" onClick={goToNext} className="absolute top-1/2 right-4 -translate-y-1/2 p-2">
//         <ChevronRight size={40} className="text-[#FF6347] cursor-pointer" />
//       </button>
//     </div>
//   );
// }
