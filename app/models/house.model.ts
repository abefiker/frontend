import mongoose, { Schema, Document } from 'mongoose';

interface IHouse extends Document {
    name: string;
    location: { latitude: string; longitude: string };
    address: string;
    price: string;
    description: string;
    bedrooms: string;
    hasBalcony: boolean;
    photos: string[];
    customerRating: number;
    contact: string;
    houseType: 'Apartment' | 'Villa' | 'Condo' | 'Townhouse',
    furnished: boolean,
    rentType: 'Monthly' | 'Yearly' | 'Half_Year' | 'Quarter_Year',
    garageAvailable: boolean,
    gardenYard: boolean;
    reviews?: {
        reviewer: string;
        rating: number;
        comment: string;
    }[];
}

const HouseSchema = new Schema<IHouse>({
    name: { type: String, required: true },
    location: { latitude: { type: String, required: true }, longitude: { type: String, required: true } },
    address: { type: String, required: true },
    price: { type: String, required: true },
    description: { type: String, required: true },
    bedrooms: { type: String, required: true },
    hasBalcony: { type: Boolean, required: true },
    photos: { type: [String], required: true },
    customerRating: { type: Number, required: true },
    contact: { type: String, required: true },
    houseType: { type: String, enum: ['Apartment', 'Villa', 'Condo', 'Townhouse'], required: true },
    furnished: { type: Boolean, required: true },
    rentType: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
    garageAvailable: { type: Boolean, required: true },
    gardenYard: { type: Boolean, required: true },
    reviews: [
        {
            reviewer: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
            comment: { type: String },
        },
    ],
});


export default mongoose.models.House || mongoose.model<IHouse>('House', HouseSchema);
