'use client';


import { Star } from 'lucide-react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useEffect, useState } from 'react';

export const truncateString = (str: string, maxLength: number): string => {
    return str.length > maxLength ? str.slice(0, maxLength) + '...' : str;
};

interface Hotel {
    _id: string;
    name: string;
    address: string;
    location: {
        latitude: string;
        longitude: string;
    };
    description: string;
    bedrooms: number;
    stars: number;
    price: number;
    customerRating: number;
    photos: string[];
    contact: {
        phone: string;
        email: string;
        website?: string;
    };
    amenities?: string[];
    services?: string[];
    policies?: string;
    reviews?: {
        reviewer: string;
        rating: number;
        comment: string;
    }[];
    availableRooms: number;
    petFriendly?: boolean;
    parkingAvailable?: boolean;
    restaurant?: boolean;
    checkInTime?: string;
    checkOutTime?: string;
}

export default function HotelList() {
    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await fetch('/api/displayHotel');
                if (!response.ok) throw new Error('Failed to fetch hotels');
                const data = await response.json();
                setHotels(data.data);
            } catch (error) {
                setError('Error fetching hotels');
            } finally {
                setLoading(false);
            }
        };
        fetchHotels();
    }, []);

    if (loading) return <p className="text-center text-lg">Loading hotels...</p>;
    if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

    return (
        <div className="py-12 px-8">
            <h2 className="text-4xl font-semibold text-[#2F4F4F] mb-8 text-center">🏨 Hotels for Stay</h2>

            {/* Grid layout for cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {hotels.map((hotel) => (
                    <div
                        key={hotel._id}
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
                                {hotel.photos.map((photo: string, index: number) => (
                                    <SwiperSlide key={`${hotel._id}-${index}`}>
                                        <img
                                            src={photo}
                                            alt={hotel.name}
                                            width={350}
                                            height={250}
                                            className="w-full h-56 object-cover"
                                            
                                        />
                                        <span className="absolute top-3 left-3 bg-[#2F4F4F] text-white text-sm px-3 py-1 rounded-lg">
                                            {hotel.price} birr / night
                                        </span>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        {/* Content Section */}
                        <div className="p-5">
                            <h3 className="text-lg font-bold text-[#2F4F4F]">{hotel.name}</h3>
                            <p className="text-gray-700 mt-2">{truncateString(hotel.description, 80)}</p>

                            {/* Rating Display */}
                            <div className="flex items-center mt-3">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`${i < hotel.customerRating ? 'text-yellow-400' : 'text-gray-300'} h-5 w-5`}
                                    />
                                ))}
                                <span className="ml-2 text-sm text-gray-600">({hotel.customerRating})</span>
                            </div>

                            {/* More Details Button */}
                            <Link href={`/hotels/${hotel._id}`} passHref>
                                <button
                                    type="button"
                                    className="mt-4 w-full bg-[#2F4F4F] text-white py-2 rounded-lg text-center hover:bg-[#1E3D3D] transition duration-200"
                                >
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
