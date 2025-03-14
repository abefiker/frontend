'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
export const truncateString = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};
interface House {
    _id: string;
    name: string;
    address: string;
    location: {
        latitude: string;
        longitude: string;
    };
    description: string;
    bedrooms: string;
    price: number;
    customerRating: number;
    photos: string[];
    contact: {
        phone: string;
        email: string;
        website: string;
    };
    hasBalcony: boolean;
    houseType: 'Apartment' | 'Villa' | 'Condo' | 'Townhouse',
    furnished: boolean,
    rentType: 'Monthly' | 'Yearly' | 'Half_Year' | 'Quarter_Year',
    garageAvailable: boolean;
    gardenYard: boolean;
}
export default function HouseList() {
    const [houses, setHouses] = useState<House[]>([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/displayHouse');
                if (response.status !== 200) throw new Error('Failed to fetch hotels');
                console.log(response)
                const data = await response.json();
                setHouses(data.data);
            } catch (error) {
                setError('Error fetching hotels');
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <p className="text-center text-lg">Loading houses...</p>;
    if (error) return <p className="text-center text-lg text-red-500">{error}</p>;
    return (
        <div className="py-12 px-8">
            <h2 className="text-4xl font-semibold text-[#2F4F4F] mb-8 text-center">🏡 Houses for Rent</h2>

            {/* Grid layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 ">
                {houses.map((house) => (
                    <div
                        key={house._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 border border-gray-300 hover:transform hover:scale-102 cursor-pointer"
                    >
                        {/* Image Carousel Section */}
                        <div className="relative">
                            <Swiper
                                modules={[Navigation, Pagination]}
                                navigation
                                pagination={{ clickable: true }}
                                className="w-full h-56"
                            >
                                {house.photos.map((photo: string, index: number) => (
                                    <SwiperSlide key={`${house._id}-${index}`}>
                                        <img
                                            src={photo}
                                            alt={house.name}
                                            width={350}
                                            height={250}
                                            className="w-full h-56 object-cover"
                                        />
                                        <span className="absolute top-3 left-3 bg-[#2F4F4F] text-white text-sm px-3 py-1 rounded-lg">
                                            {house.price} birr / month
                                        </span>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>


                        {/* Content Section */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#2F4F4F]">{house.name}</h3>
                            <p className="text-gray-700 mt-2">{truncateString(house.description, 80)}</p>

                            {/* Rating Display */}
                            <div className="flex items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-5 w-5 ${i < house.customerRating ? 'text-yellow-400' : 'text-gray-300'}`} />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({house.customerRating})</span>
                            </div>

                            {/* More Details Button */}
                            <Link href={`/House/${house._id}`} className="mt-4 block bg-[#2F4F4F] text-white py-2 px-4 rounded-lg text-center hover:bg-[#1E3D3D] hover:scale-105 transition-transform  duration-200" passHref >
                                More Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
