import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Hotel from '@/app/models/hotel.model';

export async function GET(req: Request) {
    try {
        await connectDB();
        const hotels = await Hotel.find({});
        return NextResponse.json({ data: hotels }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
    }
}