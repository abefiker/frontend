import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import Hotel from '@/app/models/hotel.model';

export async function POST(req: Request) {
    try {
        await connectDB()
        const body = req.json()
        const hotel = new Hotel({ ...body })
        await hotel.save()
        return NextResponse.json({ message: 'Hotel added successfully', hotel }, { status: 201 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to add hotel' }, { status: 500 })
    }
}