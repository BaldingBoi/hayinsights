"use client";
import React from "react";
import TVL from "../dashboard/MarketOverview/TVL";
import PEPB from "../dashboard/MarketOverview/PEPB";

const Overview = () => {
    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <div className="border-l-4 border-primary pl-2 text-2xl">
                <div>Market Statistic</div>
            </div>
            <div className="w-full grid grid-cols-2 gap-4">
                <TVL />
                <PEPB />
            </div>
        </div>
    );
};

export default Overview;
