import mongoose, { Schema, Document } from 'mongoose';

interface IHotel extends Document {
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
}

const hotelSchema = new Schema<IHotel>({
    name: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        latitude: { type: String, required: true },
        longitude: { type: String, required: true },
    },
    description: { type: String, required: true },
    bedrooms: { type: Number, required: true },
    stars: { type: Number, required: true, min: 1, max: 5 },
    price: { type: Number, required: true },
    customerRating: { type: Number, required: true, default: 0, min: 0, max: 5 },
    photos: { type: [String], required: true },
    contact: String,
    amenities: { type: [String] },
    services: { type: [String] },
    policies: { type: String },
    reviews: [
        {
            reviewer: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
            comment: { type: String },
        },
    ],
    availableRooms: { type: Number, required: true },
    petFriendly: { type: Boolean, default: false },
    parkingAvailable: { type: Boolean, default: false },
    restaurant: { type: Boolean, default: false },
    checkInTime: { type: String },
    checkOutTime: { type: String },
});

export default mongoose.models.Hotel || mongoose.model<IHotel>('Hotel', hotelSchema);
