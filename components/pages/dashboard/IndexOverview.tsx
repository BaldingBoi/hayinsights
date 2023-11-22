"use server";
import Link from "next/link";
import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./IndexOverview/Map";
import Trends from "./IndexOverview/Trends";
import { getStockData } from "@/actions/stock-data";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
const Nikkei = async () => {
    const stockData = await getStockData();
    return (
        <div className="flex-1 h-[calc(100dvh-48px)] col-span-2 flex flex-col gap-4 p-2 overflow-hidden">
            <div className="border-l-4 border-primary pl-2 text-xl flex w-full items-center justify-between">
                <Link href="/app/stocks">
                    <div>Nikkei 225</div>
                </Link>
            </div>
            <Tabs
                defaultValue="trends"
                className="w-full flex flex-col items-end justify-center flex-1"
            >
                <TabsList>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                    <TabsTrigger value="overview">Heat Map</TabsTrigger>
                </TabsList>
                <TabsContent value="trends" className="flex-1 w-full h-full">
                    <Suspense
                        fallback={
                            <Loader2 size={40} className="animate-spin" />
                        }
                    >
                        <Trends stockData={stockData} />
                    </Suspense>
                </TabsContent>
                <TabsContent value="overview" className="flex-1 w-full h-full">
                    <Suspense
                        fallback={
                            <Loader2 size={40} className="animate-spin" />
                        }
                    >
                        <Overview stockData={stockData} />
                    </Suspense>
                </TabsContent>
            </Tabs>
            <div className="w-full flex justify-center">
                <Link href={"/app/indexs"}>
                    <Button
                        className="rounded-full bg-transparent text-primary border-2 border-primary flex items-center gap-1"
                        variant={"outline"}
                    >
                        <div>See all</div>
                        <ArrowRight size={16} />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Nikkei;
