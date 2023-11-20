import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

import axios from "axios";

export async function GET() {
    const client = await clientPromise;
    const db = client.db("jps");
    const stockData = await db
        .collection("overview_stock_data")
        .find({})
        .toArray();
    return NextResponse.json(stockData);
}
