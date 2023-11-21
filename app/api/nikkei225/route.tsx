import { NextRequest, NextResponse } from "next/server";
import getDB from "@/lib/mongodb";

export async function GET(req: NextRequest) {
    const db = await getDB();
    const stockData = await db
        .collection("nikkei225")
        .find({
            Date: {
                $gte: new Date(
                    new Date().setDate(
                        new Date().getDate() -
                            parseInt(
                                req.nextUrl.searchParams.get("days") || "30"
                            )
                    )
                ),
            },
        })
        .toArray();
    return NextResponse.json(stockData);
}
