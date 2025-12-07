import { NextResponse } from "next/server";
import connectMongo from "../../../lib/connectMongo";
import Movieslist from "../../../models/Movieslist";

export async function GET() {
    await connectMongo();
    const movies = await Movieslist.find();
    return NextResponse.json(movies);
}
