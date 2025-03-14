import { connectDB } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Pension from "@/app/models/pension.model";
export async function GET(req: Request) {
    try {
        await connectDB()
        const pensions = await Pension.find({})
        return NextResponse.json({ data: pensions }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'Error registering house', error }, { status: 500 });
    }
}