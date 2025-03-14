'use client'
import { useState } from 'react';
import { MultiImageDropzone } from '@/app/components/MultiImageDropzone';
import { useImageUploader } from '@/app/hooks/useImageUploader';
// Assuming you have this hook

export default function Page() {
    const [formData, setFormData] = useState<{
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
        contact: string;
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
    }>({
        name: "",
        location: { latitude: '', longitude: '' },
        address: "",
        price: 0,
        description: "",
        bedrooms: 0,
        stars: 0,
        photos: [],
        customerRating: 0,
        contact: "",
        amenities: [],
        services: [],
        policies: "",
        reviews: [],
        availableRooms: 0,
        petFriendly: false,
        parkingAvailable: false,
        restaurant: false,
        checkInTime: "",
        checkOutTime: "",
    });

    const [message, setMessage] = useState("");
    const { fileStates, handleFileUpload, uploadedUrls } = useImageUploader();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const target = e.target as HTMLInputElement;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    };

    const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            location: {
                ...prev.location,
                [name]: value,
            },
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/createHotel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, photos: uploadedUrls }),
            });
            const result = await response.json();

            if (response.status === 201) {
                setMessage(result.message);
                setFormData({
                    name: "",
                    location: { latitude: '', longitude: '' },
                    address: "",
                    price: 0,
                    description: "",
                    bedrooms: 0,
                    stars: 0,
                    photos: [],
                    customerRating: 0,
                    contact: "",
                    amenities: [],
                    services: [],
                    policies: "",
                    reviews: [],
                    availableRooms: 0,
                    petFriendly: false,
                    parkingAvailable: false,
                    restaurant: false,
                    checkInTime: "",
                    checkOutTime: "",
                });
            } else {
                console.error('Something went wrong');
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Error submitting form");
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-gray-300 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-[#2F4F4F] text-center mb-4">Register a Hotel</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {message && <p className="text-center text-green-600 mt-4">{message}</p>}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700">Hotel Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700">Address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="latitude" className="block text-sm font-semibold text-gray-700">Latitude</label>
                        <input
                            type="text"
                            id="latitude"
                            name="latitude"
                            value={formData.location.latitude}
                            onChange={handleLocationChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="longitude" className="block text-sm font-semibold text-gray-700">Longitude</label>
                        <input
                            type="text"
                            id="longitude"
                            name="longitude"
                            value={formData.location.longitude}
                            onChange={handleLocationChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-semibold text-gray-700">Bedrooms</label>
                        <input
                            type="number"
                            id="bedrooms"
                            name="bedrooms"
                            value={formData.bedrooms}
                            onChange={handleChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="stars" className="block text-sm font-semibold text-gray-700">Stars</label>
                        <input
                            type="number"
                            id="stars"
                            name="stars"
                            value={formData.stars}
                            onChange={handleChange}
                            required
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="price" className="block text-sm font-semibold text-gray-700">Price</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="contact" className="block text-sm font-semibold text-gray-700">Contact Information</label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="amenities" className="block text-sm font-semibold text-gray-700">Amenities</label>
                    <input
                        type="text"
                        id="amenities"
                        name="amenities"
                        value={formData.amenities}
                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="services" className="block text-sm font-semibold text-gray-700">Services</label>
                    <input
                        type="text"
                        id="services"
                        name="services"
                        value={formData.services}                        onChange={handleChange}
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div>
                    <label htmlFor="policies" className="block text-sm font-semibold text-gray-700">Policies</label>
                    <textarea
                        id="policies"
                        name="policies"
                        value={formData.policies}
                        onChange={handleChange}
                        rows={3}
                        className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                </div>

                <div className="flex items-center space-x-4">
                    <div>
                        <input
                            type="checkbox"
                            id="petFriendly"
                            name="petFriendly"
                            checked={formData.petFriendly}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <label htmlFor="petFriendly" className="text-sm text-gray-700">Pet Friendly</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="parkingAvailable"
                            name="parkingAvailable"
                            checked={formData.parkingAvailable}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <label htmlFor="parkingAvailable" className="text-sm text-gray-700">Parking Available</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            id="restaurant"
                            name="restaurant"
                            checked={formData.restaurant}
                            onChange={handleChange}
                            className="form-checkbox"
                        />
                        <label htmlFor="restaurant" className="text-sm text-gray-700">Restaurant</label>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="checkInTime" className="block text-sm font-semibold text-gray-700">Check-in Time</label>
                        <input
                            type="time"
                            id="checkInTime"
                            name="checkInTime"
                            value={formData.checkInTime}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label htmlFor="checkOutTime" className="block text-sm font-semibold text-gray-700">Check-out Time</label>
                        <input
                            type="time"
                            id="checkOutTime"
                            name="checkOutTime"
                            value={formData.checkOutTime}
                            onChange={handleChange}
                            className="mt-2 p-3 border border-gray-700 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                </div>
                {/* Multi-Image Upload */}
                <MultiImageDropzone
                    value={fileStates}
                    dropzoneOptions={{ maxFiles: 6 }}
                    onChange={async (files) => { await handleFileUpload(files) }}
                />

                {/* Display Uploaded Photos */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                    {uploadedUrls.map((photo, index) => (
                        <img key={index} width={200} height={200} src={photo} alt={`Upload preview ${index + 1}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                </div>

                <button type="submit" className="w-full bg-[#1E3D3D] hover:bg-[#183030] text-white py-2 rounded transition duration-300 cursor-pointer">Register Hotel</button>

            </form>
        </div>
    );
}
