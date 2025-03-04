'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { houses } from '@/app/data/houses'; // Assuming house data is imported

export const truncateString = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

export default function HouseList() {
    return (
        <div className="py-12 px-8">
            <h2 className="text-4xl font-semibold text-[#2F4F4F] mb-8 text-center">🏡 Houses for Rent</h2>

            {/* Grid layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {houses.map((house) => (
                    <div
                        key={house.id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-300 hover:transform hover:scale-102 cursor-pointer"
                    >
                        {/* Image Section */}
                        <div className="relative">
                            <Image
                                src={house.image}
                                alt={house.name}
                                width={350}
                                height={250}
                                className="w-full h-56 object-cover"
                            />
                            <span className="absolute top-3 left-3 bg-[#2F4F4F] text-white text-sm px-3 py-1 rounded-lg">
                                ${house.price} / month
                            </span>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#2F4F4F]">{house.name}</h3>
                            <p className="text-gray-700 mt-2">{truncateString(house.description, 80)}</p>

                            {/* Rating Display */}
                            <div className="flex items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < house.rating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({house.rating})</span>
                            </div>

                            {/* More Details Button */}
                            <Link href={`/houses/${house.id}`} passHref>
                                <button type='button' className="mt-4 w-full bg-[#2F4F4F] text-white py-2 rounded-lg text-center hover:bg-[#1E3D3D] transition duration-200">
                                    More Details
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
