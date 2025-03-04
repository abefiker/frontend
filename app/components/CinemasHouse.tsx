// 'use client';

// import Image from 'next/image';
// import { MapPin } from 'lucide-react';
// import { truncateString } from './TheatersHouse';
// import Link from 'next/link'
// import { cinemas } from '@/app/data/cinema';

// export default function CinemaHouse() {
//     return (
//         <div className="py-10 px-6 bg-gray-50">
//             <h2 className="text-3xl font-semibold text-[#FF6347] mb-6">
//                 🍿 Cinemas Near You
//             </h2>

//             {/* Horizontal Scroll for Large Screens */}
//             <div className="hidden md:flex overflow-x-auto space-x-6 pb-6">
//                 {cinemas.map((cinema) => (
//                     <div
//                         key={cinema.id}
//                         className="bg-white shadow-md w-80 transition transform hover:scale-105 cursor-pointer"
//                     >
//                         <Image
//                             src={cinema.image}
//                             alt={cinema.name}
//                             width={300}
//                             height={200}
//                             className="w-full h-48 object-cover "
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-semibold text-gray-800">{cinema.name}</h3>
//                             <p className="text-gray-600 mt-2">{truncateString(cinema.description, 70)}</p>
//                             <p className="mt-2 flex text-gray-600">
//                                 <MapPin className="text-red-500 mx-2" />
//                                 {cinema.location}
//                             </p>
//                             <Link href={`/cinemaHouse/${cinema.id}`} passHref>
//                                 <button type="button" className="mt-4 px-6 py-2 bg-[#FF6347] text-white rounded-full cursor-pointer">
//                                     View Schedule
//                                 </button>
//                             </Link>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             {/* Stack Layout for Small Screens */}
//             <div className="md:hidden grid gap-8">
//                 {cinemas.map((cinema, index) => (
//                     <div
//                         key={index}
//                         className="bg-white shadow-md rounded-lg overflow-hidden transition transform hover:scale-105"
//                     >
//                         <Image
//                             src={cinema.image}
//                             alt={cinema.name}
//                             width={500}
//                             height={300}
//                             className="w-full h-64 object-cover rounded-t-lg"
//                         />
//                         <div className="p-4">
//                             <h3 className="text-xl font-semibold text-gray-800">{cinema.name}</h3>
//                             <p className="text-gray-600 mt-2">{truncateString(cinema.description, 100)}</p>
//                             <p className="mt-2 flex text-gray-600">
//                                 <MapPin className="text-red-500 mx-2" />
//                                 {cinema.location}
//                             </p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
