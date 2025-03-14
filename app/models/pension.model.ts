import mongoose, { Schema, Document } from 'mongoose';

interface IPension extends Document {
    name: string;
    location: { latitude: string; longitude: string };
    address: string;
    price: number;
    description: string;
    roomsAvailable: number;
    amenities: string[];
    hasBalcony: boolean;
    photos: string[];
    customerRating: number;
    contact: { phone: string; email: string; website?: string };
    pensionType: 'Guesthouse' | 'Retirement' | 'Boutique' | 'Budget';
    furnished: boolean;
    rentType: 'Daily' | 'Weekly' | 'Monthly';
    parkingAvailable: boolean;
    diningFacilities: boolean;
    petFriendly: boolean;
    wifiAvailable: boolean;
    wheelchairAccessible: boolean;
    checkInTime: string;
    checkOutTime: string;
    reviews?: {
        reviewer: string;
        rating: number;
        comment: string;
    }[];
}

const PensionSchema = new Schema<IPension>({
    name: { type: String, required: true },
    location: { latitude: { type: String, required: true }, longitude: { type: String, required: true } },
    address: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    roomsAvailable: { type: Number, required: true },
    amenities: { type: [String], required: true },
    hasBalcony: { type: Boolean, required: false },
    photos: { type: [String], required: true },
    customerRating: { type: Number, required: true },
    contact: String,
    pensionType: { type: String, enum: ['Guesthouse', 'Retirement', 'Boutique', 'Budget'], required: true },
    furnished: { type: Boolean, required: true },
    rentType: { type: String, enum: ['Daily', 'Weekly', 'Monthly'], required: true },
    parkingAvailable: { type: Boolean, required: true },
    diningFacilities: { type: Boolean, required: true },
    petFriendly: { type: Boolean, required: false },
    wifiAvailable: { type: Boolean, required: true },
    wheelchairAccessible: { type: Boolean, required: false },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    reviews: [
        {
            reviewer: { type: String, required: true },
            rating: { type: Number, required: true, min: 0, max: 5 },
            comment: { type: String },
        },
    ],
});

export default mongoose.models.Pension || mongoose.model<IPension>('Pension', PensionSchema);
