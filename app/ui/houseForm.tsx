import Form from 'next/form'
import { useState } from 'react';
export default function Page() {
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        address: "",
        price: "",
        description: "",
        bedrooms: "",
        hasBalcony: false,
        photos: [],
    });
    const [message, setMessage] = useState("")
    // handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target
        const target = e.target as HTMLInputElement;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? target.checked : value,
        }));
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8001/api/v1/stays/houses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })
            const result = await response.json()
            if (response.status === 200) {
                setMessage(result.message)
                setFormData({
                    name: "",
                    location: "",
                    address: "",
                    price: "",
                    description: "",
                    bedrooms: "",
                    hasBalcony: false,
                    photos: [],
                })
            } else {
                console.error('Something went wrong')
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            setMessage("Error submitting form");
        }
    }
    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full" required />
            <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} className="border p-2 w-full" required />
            <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} className="border p-2 w-full" required />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 w-full" required />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 w-full" required />
            <input type="number" name="bedrooms" placeholder="Bedrooms" value={formData.bedrooms} onChange={handleChange} className="border p-2 w-full" required />
            <label className="flex items-center space-x-2">
                <input type="checkbox" name="hasBalcony" checked={formData.hasBalcony} onChange={handleChange} />
                <span>Has Balcony?</span>
            </label>
            <input type="text" name="photos" placeholder="Photos (comma-separated URLs)" value={formData.photos} onChange={handleChange} className="border p-2 w-full" />

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register House</button>
            {message && <p className="text-green-500">{message}</p>}
        </form>
    )
}