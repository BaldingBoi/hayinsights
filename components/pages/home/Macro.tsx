import { Button } from "@/components/ui/button";
import { BarChart4, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const Macro = () => {
    return (
        <div className="w-full flex flex-col  items-center justify-center gap-8 pb-20">
            <div className="text-3xl font-bold flex items-center gap-4">
                <BarChart4 size={36} className="text-primary" />
                <div>Macroeconomics</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Exchange rates (USD/JPY)</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Gross Domestic Product (GDP)</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">Consumer Price Index (CPI)</div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4 border border-1 border-primary rounded-xl p-4 w-100">
                    <div className="text-xl">
                        Producer price & Export/Import price
                    </div>
                </div>
            </div>
            <Link href={"/macro-data"}>
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

export default Macro;
