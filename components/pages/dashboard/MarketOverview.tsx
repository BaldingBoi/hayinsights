"use client";
import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { BarChart3, Bot } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
import { ChatStore, useChatStore } from "@/store/chatStore";
const styleConfig = resolveConfig(tailwindConfig);

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend
);

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: true,
            position: "bottom",
            reverse: true,
        },
        title: {
            display: false,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            ticks: {
                autoSkip: true,
                maxTicksLimit: 4,
            },
        },
        y: {
            display: true,
            grid: {
                display: false,
            },
        },
    },
};

const data = {
    labels: ["Prime", "Standard"],
    datasets: {
        "average-pe": [15.7, 13.6],
        "weighted-average-pe": [17.0, 16.2],
        "average-pb": [1.2, 0.8],
        "weighted-average-pb": [1.3, 1.0],
    },
};

const MarketOverview = () => {
    const { messages, setOpenChat, addMessage, setLoading } =
        useChatStore() as ChatStore;
    const analyzeWithAI = async () => {
        setOpenChat(true);
        setLoading(true);
        const res = await fetch("/api/chat", {
            method: "POST",
            body: JSON.stringify({
                messages: [
                    ...messages,
                    {
                        content: `Analyze this data and give me a short summary of insights and predictions about Japan's economy and finanocial markets market: ${JSON.stringify(
                            data
                        )}`,
                        role: "user",
                    },
                ],
            }),
        });

        const newMessage = await res.json();

        addMessage(newMessage);
        setLoading(false);
    };
    return (
        <div className="h-ful col-span-2 flex flex-col gap-4 p-1">
            <div className="border-l-4 border-primary pl-2 text-xl flex w-full items-center justify-between">
                <Link href="/app/stocks">
                    <div>Market Statistic Overview</div>
                </Link>
            </div>
            <div className="h-full flex flex-col gap-4">
                <Card className="flex-1 bg-red-200"></Card>
                <Card className="flex-1 flex flex-col gap-4 p-4">
                    <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BarChart3 className="text-primary" />
                            <div>
                                Average & Weighted Average PER/PBR{" "}
                                <span className="text-slate-600 font-light">
                                    (Updated 3rd Quarter 2023)
                                </span>
                            </div>
                        </div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger onClick={analyzeWithAI}>
                                    <Bot size={20} />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div>Analyze with AI</div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Tabs
                        defaultValue="pe"
                        className="w-full flex flex-col items-center"
                    >
                        <TabsList className="">
                            <TabsTrigger value="pe">PER</TabsTrigger>
                            <TabsTrigger value="pb">PBR</TabsTrigger>
                        </TabsList>
                        <TabsContent value="pe" className="w-full">
                            <Bar
                                //@ts-ignore
                                options={chartOptions}
                                data={{
                                    labels: data.labels,
                                    datasets: [
                                        {
                                            label: "Average PE Ratio",
                                            data: data.datasets["average-pe"],
                                            borderWidth: 0,
                                            backgroundColor:
                                                //@ts-ignore
                                                styleConfig.theme?.colors
                                                    ?.emerald[300],
                                            borderColor: "transparent",
                                        },
                                        {
                                            label: "Weighted Average PE Ratio",
                                            data: data.datasets[
                                                "weighted-average-pe"
                                            ],
                                            borderWidth: 0,
                                            backgroundColor:
                                                //@ts-ignore
                                                styleConfig.theme?.colors
                                                    ?.emerald[500],
                                            borderColor: "transparent",
                                        },
                                    ],
                                }}
                            />
                        </TabsContent>
                        <TabsContent value="pb" className="w-full">
                            <Bar
                                //@ts-ignore
                                options={chartOptions}
                                data={{
                                    labels: data.labels,
                                    datasets: [
                                        {
                                            label: "Average PB Ratio",
                                            data: data.datasets["average-pb"],
                                            borderWidth: 0,
                                            backgroundColor:
                                                //@ts-ignore
                                                styleConfig.theme?.colors
                                                    ?.indigo[300],
                                            borderColor: "transparent",
                                        },
                                        {
                                            label: "Weighted Average PB Ratio",
                                            data: data.datasets[
                                                "weighted-average-pb"
                                            ],
                                            borderWidth: 0,
                                            backgroundColor:
                                                //@ts-ignore
                                                styleConfig.theme?.colors
                                                    ?.indigo[500],
                                            borderColor: "transparent",
                                        },
                                    ],
                                }}
                            />
                        </TabsContent>
                    </Tabs>
                </Card>
            </div>
        </div>
    );
};

export default MarketOverview;
