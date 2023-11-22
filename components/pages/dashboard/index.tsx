import React, { Suspense } from "react";
import MacroOverview from "./MacroOverview";
import MarketOverview from "./MarketOverview";
import IndexOverview from "./IndexOverview";

const Dashboard = () => {
    return (
        <div className="w-full flex-1 h-[calc(100dvh-48px)] grid grid-cols-5 px-4">
            <MacroOverview />
            <MarketOverview />

            <Suspense fallback={<></>}>
                <IndexOverview />
            </Suspense>
        </div>
    );
};

export default Dashboard;
