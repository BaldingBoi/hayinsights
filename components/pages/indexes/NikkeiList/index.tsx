"use client";
import { Card } from "@/components/ui/card";
import React, { useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { StockData } from "@/lib/stock";

const NikkeiList = ({ stockData }: { stockData: StockData[] | null }) => {
    const [data, setData] = React.useState<any>([]);
    // useEffect(() => {
    //     if (stockData) {
    //         setData(
    //             stockData.map((stock) => {
    //                 return {
    //                     ...stock,
    //                     Price: parseFloat(stock["Price"].split(" ")[0]),
    //                 };
    //             })
    //         );
    //     }
    // }, [stockData]);
    return (
        <Card className="h-full w-full p-4">
            <DataTable columns={columns} data={stockData || []} />
        </Card>
    );
};

export default NikkeiList;
