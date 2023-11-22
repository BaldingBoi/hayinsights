import { CandlestickChart } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "./Overview";
import Nikkei from "../indexs/Nikkei";

const Stock = () => {
    return (
        <div className="h-full w-full p-4 flex flex-col gap-16">
            <Tabs defaultValue="overview" className="w-full">
                <div className="w-full flex items-center gap-8">
                    <div className="flex items-center gap-2 text-3xl font-semibold">
                        <CandlestickChart size={32} />
                        <div>Stock Market</div>
                    </div>
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="more" disabled>
                            Comming soon
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="overview">
                    <Overview />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Stock;
