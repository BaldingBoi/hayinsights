import { Button } from "@/components/ui/button";
import { CandlestickChart, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Market = () => {
    return (
        <div className="w-full flex flex-col  items-center justify-center gap-8 pb-20">
            <div className="text-3xl font-bold flex items-center gap-4">
                <CandlestickChart size={36} className="text-primary" />
                <div>Stock Market</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Trading Volume</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Trading Value</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Statistics</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Listed Company</div>
                </div>
            </div>
            <Link href={"/stocks"}>
                <Button
                    variant={"outline"}
                    className="flex items-center gap-1 rounded-full px-4 py-2 border border-2 border-primary text-primary"
                >
                    <div>See details</div>
                    <ChevronRight size={24} />
                </Button>
            </Link>
        </div>
    );
};

export default Market;
