import Link from "next/link";
import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Map from "../dashboard/IndexOverview/Map";
import Trends from "../dashboard/IndexOverview/Trends";
import { getStockData } from "@/actions/stock-data";
import { Loader2 } from "lucide-react";
import NikkeiList from "./NikkeiList";

const Nikkei = async () => {
    const stockData = await getStockData();

    return (
        <div className="w-full h-full flex flex-col gap-4 p-4">
            <div className="border-l-4 border-primary pl-2 text-2xl">
                <div>Nikkei225</div>
            </div>
            <div className="w-full grid grid-cols-5 gap-4 flex-1">
                <div className="col-span-3 h-fits">
                    <NikkeiList stockData={stockData} />
                </div>
                <div className="col-span-2 h-full">
                    <Tabs
                        defaultValue="trend"
                        className="w-full h-full flex flex-col items-end"
                    >
                        <TabsList>
                            <TabsTrigger value="trend">Trends</TabsTrigger>
                            <TabsTrigger value="map">Map</TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="trend"
                            className="w-full h-full flex-1"
                        >
                            <Trends stockData={stockData} />
                        </TabsContent>
                        <TabsContent
                            value="map"
                            className="w-full h-full flex-1"
                        >
                            <Map stockData={stockData} />
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default Nikkei;
