import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongodb";
import House from '@/app/models/house.model';

export async function GET(req: Request) {
    try {
        await connectDB()
        const houses = await House.find({});
        console.log(houses)
        return NextResponse.json({ data: houses }, { status: 200 });
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error registering house', error }, { status: 500 });
    }
}