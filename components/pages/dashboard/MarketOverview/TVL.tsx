"use client";
import React, { useEffect } from "react";
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
import TVLData from "@/data/tvl.json";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ScriptableContext,
    PointElement,
    LineElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
const styleConfig = resolveConfig(tailwindConfig);

import { ChatStore, useChatStore } from "@/store/chatStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
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
                maxTicksLimit: 6,
            },
        },
        y: {
            display: true,
            grid: {
                display: false,
            },
        },
        y1: {
            display: true,
            position: "right",
            grid: {
                display: false,
            },
        },
    },
};

const TVL = () => {
    const [labels, setLabels] = React.useState<any>();
    const [totalData, setTotalData] = React.useState<any>();
    const [dailyData, setDailyData] = React.useState<any>();

    const [totalVolume, setTotalVolume] = React.useState<any>();
    const [totalValue, setTotalValue] = React.useState<any>();
    const [dailyVolume, setDailyVolume] = React.useState<any>();
    const [dailyValue, setDailyValue] = React.useState<any>();
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
                        content: `Analyze this data and give me a short summary of insights and predictions about Japan's economy and financial markets market: ${JSON.stringify(
                            TVLData
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
    useEffect(() => {
        setLabels(TVLData.map((item) => item["Time"]));
        setTotalVolume(
            TVLData.map((item) =>
                parseInt(
                    item["Total Trading Volume (thousand shares)"].replace(
                        ",",
                        ""
                    )
                )
            )
        );
        setTotalValue(
            TVLData.map((item) =>
                parseInt(
                    item["Total Trading Value (Million Yen)"].replace(",", "")
                )
            )
        );
        setDailyVolume(
            TVLData.map((item) =>
                parseInt(
                    item[
                        "Daily Average Trading Volume (thousand shares)"
                    ].replace(",", "")
                )
            )
        );
        setDailyValue(
            TVLData.map((item) =>
                parseFloat(
                    item["Daily Average Trading Value (Million Yen)"].replace(
                        ",",
                        ""
                    )
                )
            )
        );
    }, []);

    return (
        <Card className="flex-1 flex flex-col gap-4 p-4">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart3 className="text-primary" />
                    <div>Stock Trading Volume & Value</div>
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
                    <TabsTrigger value="pe">Total</TabsTrigger>
                    <TabsTrigger value="pb">Daily Average</TabsTrigger>
                </TabsList>
                <TabsContent value="pe" className="w-full">
                    <Bar
                        //@ts-ignore
                        options={chartOptions}
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Trading Value (Trillion Yen)",
                                    data: totalValue,
                                    //@ts-ignore
                                    type: "line",
                                    fill: false,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.amber[500],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.amber[500],
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                    yAxisID: "y1",
                                    borderWidth: 2,
                                },
                                {
                                    label: "Trading Volume (Million Shares)",
                                    data: totalVolume,
                                    yAxisID: "y",
                                    borderWidth: 1,
                                    borderColor: "rgba(100, 116, 139, 0.2)",
                                    backgroundColor: (
                                        context: ScriptableContext<"bar">
                                    ) => {
                                        const ctx = context.chart.ctx;
                                        const gradient =
                                            ctx.createLinearGradient(
                                                0,
                                                0,
                                                0,
                                                500
                                            );
                                        gradient.addColorStop(
                                            0,
                                            "rgba(100, 116, 139, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(100, 116, 139, 0)"
                                        );
                                        return gradient;
                                    },
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
                            labels: labels,
                            datasets: [
                                {
                                    label: "Trading Value (Trillion Yen)",
                                    data: dailyValue,
                                    //@ts-ignore
                                    type: "line",
                                    fill: false,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.amber[500],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.amber[500],
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                    yAxisID: "y1",
                                    borderWidth: 2,
                                },
                                {
                                    label: "Trading Volume (Million Shares)",
                                    data: dailyVolume,
                                    yAxisID: "y",
                                    borderWidth: 1,
                                    borderColor: "rgba(100, 116, 139, 0.2)",
                                    backgroundColor: (
                                        context: ScriptableContext<"bar">
                                    ) => {
                                        const ctx = context.chart.ctx;
                                        const gradient =
                                            ctx.createLinearGradient(
                                                0,
                                                0,
                                                0,
                                                500
                                            );
                                        gradient.addColorStop(
                                            0,
                                            "rgba(100, 116, 139, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(100, 116, 139, 0)"
                                        );
                                        return gradient;
                                    },
                                },
                            ],
                        }}
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
export default TVL;
