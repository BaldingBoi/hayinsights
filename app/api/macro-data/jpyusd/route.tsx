import { NextRequest, NextResponse } from "next/server";
import RateDataQuarterly from "@/data/rate-quarterly.json";
import RateDataAnnual from "@/data/rate-annual.json";

export async function GET(req: NextRequest) {
    const rateQ = RateDataQuarterly;
    const rateA = RateDataAnnual;
    const data = {
        quarterly: {
            rate: [...rateQ["Rate"]].slice(-12).map((r) => 1 / r),
            time: [...rateQ["Time"]].slice(-12),
        },
        annual: {
            rate: [...rateA["Rate"]].slice(-6).map((r) => 1 / r),
            time: [...rateA["Time"]].slice(-6),
        },
    };

    return NextResponse.json(data);
}
