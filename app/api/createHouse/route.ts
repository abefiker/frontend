import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import House from "@/app/models/house.model";

export async function POST(req: Request) {
    try {
        await connectDB(); // Parse JSON body
        const body = await req.json();
        const { name, location, address, price, description, bedrooms, hasBalcony, photos, customerRating, contact, houseType, furnished, rentType, garageAvailable, gardenYard } = body;
        const house = new House({
            name, location, address, price, description, bedrooms, hasBalcony, photos, customerRating, contact, houseType,
            furnished,
            rentType,
            garageAvailable,
            gardenYard,
        });
        await house.save()
        return NextResponse.json({ message: 'House registered successfully', house }, { status: 201 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error registering house', error }, { status: 500 });
    }

}