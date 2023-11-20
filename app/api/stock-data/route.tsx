import { NextRequest, NextResponse } from "next/server";
import getDB from "@/lib/mongodb";

export async function GET() {
    const db = await getDB();
    const stockData = await db
        .collection("overview_stock_data")
        .find({})
        .toArray();
    return NextResponse.json(stockData);
}
