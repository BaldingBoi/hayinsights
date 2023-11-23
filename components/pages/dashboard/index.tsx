import React, { Suspense } from "react";
import MacroOverview from "./MacroOverview";
import MarketOverview from "./MarketOverview";
import IndexOverview from "./IndexOverview";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
    return (
        <div className="w-full flex-1 h-[calc(100dvh-48px)] grid grid-cols-5 px-4">
            <MacroOverview />
            <MarketOverview />

            <Suspense
                fallback={
                    <div className="w-full h-full flex justify-center items-center">
                        <Loader2 className="animate-spin" />
                    </div>
                }
            >
                <IndexOverview />
            </Suspense>
        </div>
    );
};

export default Dashboard;
