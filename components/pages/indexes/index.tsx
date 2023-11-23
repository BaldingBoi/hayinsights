import { List, Loader2 } from "lucide-react";
import React, { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Nikkei from "./Nikkei";

const Indexes = () => {
    return (
        <div className="h-full w-full p-4 flex flex-col gap-16 overflow-auto no-scrollbar">
            <Tabs
                defaultValue="Nikkei225"
                className="w-full h-full flex flex-col"
            >
                <div className="w-full flex items-center gap-8">
                    <div className="flex items-center gap-2 text-3xl font-semibold">
                        <List size={32} />
                        <div>Index</div>
                    </div>
                    <TabsList>
                        <TabsTrigger value="Nikkei225">Nikkei225</TabsTrigger>
                        <TabsTrigger value="more" disabled>
                            Comming soon
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="Nikkei225" className="w-full">
                    <Suspense
                        fallback={<Loader2 className="animate-spin m-auto" />}
                    >
                        <Nikkei />
                    </Suspense>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Indexes;
