'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, MapPin, Home, DollarSign } from 'lucide-react';
import axios from 'axios';

interface House {
    _id: string;
    name: string;
    location: { latitude: number; longitude: number };
    address: string;
    price: number;
    description: string;
    bedrooms: number;
    hasBalcony: boolean;
    rating: number;
    images: string[];
}

export default function HouseDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [house, setHouse] = useState<House | null>(null);

    useEffect(() => {
        if (params?.id) {
            axios.get(`/api/houses/${params.id}`)
                .then((response: any) => setHouse(response.data))
                .catch(() => router.push('/not-found'));
        }
    }, [params?.id, router]);

    if (!house) return <div className="text-center py-20 text-gray-600">Loading...</div>;

    return (
        <div className="container mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-8 bg-white p-6 shadow-lg rounded-lg">
                {/* Left side - Image Gallery */}
                <div className="relative">
                    {house.images && house.images.length > 0 ? (
                        <Image
                            src={house.images[0]}
                            alt={house.name}
                            width={600}
                            height={400}
                            className="w-full h-96 object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-96 bg-gray-300 flex items-center justify-center rounded-lg">
                            <p>No Image Available</p>
                        </div>
                    )}
                </div>

                {/* Right side - Details */}
                <div>
                    <h1 className="text-3xl font-semibold text-[#2F4F4F]">{house.name}</h1>
                    <p className="text-gray-700 mt-2 flex items-center">
                        <MapPin className="text-red-500 mr-2" />
                        {house.address}
                    </p>
                    <p className="text-gray-600 mt-4">{house.description}</p>

                    <div className="mt-6 flex items-center">
                        <Home className="text-[#2F4F4F] mr-2" />
                        <span className="text-lg text-gray-800">{house.bedrooms} Bedrooms</span>
                    </div>

                    <div className="mt-3 flex items-center">
                        <DollarSign className="text-[#2F4F4F] mr-2" />
                        <span className="text-lg font-bold text-gray-800">${house.price}</span>
                    </div>

                    <div className="mt-4 flex items-center">
                        <Star className="text-yellow-500 mr-2" />
                        <span className="text-lg font-semibold text-gray-800">{house.rating} / 5</span>
                    </div>

                    {house.hasBalcony && (
                        <p className="mt-4 text-green-600 font-medium">✔ Has Balcony</p>
                    )}

                    <button className="mt-6 px-6 py-2 bg-[#2F4F4F] text-white rounded-full hover:bg-[#1c3b3b]">
                        Contact Owner
                    </button>
                </div>
            </div>
        </div>
    );
}
