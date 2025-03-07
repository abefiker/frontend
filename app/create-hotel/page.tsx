'use client'
import { useState } from 'react';
import { MultiImageDropzone } from '@/app/components/MultiImageDropzone';
import { useImageUploader } from '@/app/hooks/useImageUploader';

export default function Page() {
    const [formData, setFormData] = useState<{
        name: string;
        location: { latitude: string; longitude: string };
        address: string;
        price: string;
        description: string;
        bedrooms: string;
        hasJacuzzi: boolean;
        photos: string[];
        stars: number;
        customerRating: number;
        contact: string;
    }>({
        name: "",
        location: { latitude: '', longitude: '' },
        address: "",
        price: "",
        description: "",
        bedrooms: "",
        hasJacuzzi: false,
        stars: 0,
        photos: [],
        customerRating: 0,
        contact: ""
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
            const response = await fetch('http://localhost:8001/api/v1/stays/hotels', {
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
                    price: "",
                    description: "",
                    bedrooms: "",
                    hasJacuzzi: false,
                    stars: 0,
                    photos: [],
                    customerRating: 0,
                    contact: ""
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
                {message && <p className="text-center text-lg text-green-400 mt-2">{message}</p>}
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />

                {/* Latitude and Longitude */}
                <div className="grid grid-cols-2 gap-2">
                    <input
                        type="number"
                        name="latitude"
                        placeholder="Latitude"
                        value={formData.location.latitude}
                        onChange={handleLocationChange}
                        className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none"
                        required
                        step="any"
                    />
                    <input
                        type="number"
                        name="longitude"
                        placeholder="Longitude"
                        value={formData.location.longitude}
                        onChange={handleLocationChange}
                        className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none"
                        required
                        step="any"
                    />
                </div>

                <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />
                <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />

                {/* Has Jacuzzi Checkbox */}
                <label className="flex items-center space-x-2">
                    <input type="checkbox" name="hasJacuzzi" checked={formData.hasJacuzzi} onChange={handleChange} className="w-4 h-4 text-[#1E3D3D] border-gray-300 rounded focus:ring-[#1E3D3D]" />
                    <span>Has Jacuzzi?</span>
                </label>

                {/* Stars */}
                <label className='flex items-center space-x-2'>
                    <input
                        type="number"
                        name="stars"
                        placeholder="Stars (Rating)"
                        value={formData.stars}
                        onChange={handleChange}
                        className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none"
                        required
                    />
                </label>

                {/* Customer Rating */}
                <input type="number" name="customerRating" placeholder="Customer Rating" value={formData.customerRating} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />

                {/* Contact Information */}
                <input type="text" name="contact" placeholder="Contact Information" value={formData.contact} onChange={handleChange} className="w-full border border-gray-300 bg-white text-gray-900 p-2 rounded focus:ring-2 focus:ring-[#1E3D3D] outline-none" required />

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

                <button type="submit" className="w-full bg-[#1E3D3D] hover:bg-[#183030] text-white py-2 rounded transition duration-300">Register Hotel</button>
            </form>
        </div>
    );
}
