import Link from "next/link";
import React from "react";
import Chart from "react-apexcharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./IndexOverview/Overview";
import Trends from "./IndexOverview/Trends";

const Nikkei = () => {
    return (
        <div className="flex-1 h-[calc(100dvh-48px)] col-span-2 flex flex-col gap-4 p-1">
            <div className="border-l-4 border-primary pl-2 text-xl flex w-full items-center justify-between">
                <Link href="/app/stocks">
                    <div>Nikkei 225</div>
                </Link>
            </div>
            <Tabs
                defaultValue="overview"
                className="w-full flex flex-col items-center justify-center flex-1"
            >
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="trends">Trends</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="flex-1 w-full">
                    <Overview />
                </TabsContent>
                <TabsContent value="trends" className="flex-1">
                    <Trends />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Nikkei;
