import React from "react";
import MacroOverview from "./MacroOverview";
import MarketOverview from "./MarketOverview";
import IndexOverview from "./IndexOverview";

const Dashboard = () => {
    return (
        <div className="w-full h-full grid grid-cols-5 gap-1">
            <MacroOverview />
            <MarketOverview />
            <IndexOverview />
        </div>
    );
};

export default Dashboard;
