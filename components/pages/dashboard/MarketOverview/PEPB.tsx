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
    ScriptableContext,
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
    labels: ["Prime Category", "Standard Category"],
    datasets: {
        "average-pe": [15.7, 13.6],
        "weighted-average-pe": [17.0, 16.2],
        "average-pb": [1.2, 0.8],
        "weighted-average-pb": [1.3, 1.0],
    },
};

const PEPB = () => {
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
        <Card className="flex-1 flex flex-col gap-4 p-4">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <BarChart3 className="text-primary" />
                    <div>Average & Weighted Average PER/PBR</div>
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
                                    borderWidth: 1,
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
                                            "rgba(255, 163, 81, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(255, 163, 81, 0)"
                                        );
                                        return gradient;
                                    },
                                    borderColor: "rgba(255, 163, 81, 0.1)",
                                },
                                {
                                    label: "Weighted Average PE Ratio",
                                    data: data.datasets["weighted-average-pe"],
                                    borderWidth: 1,
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
                                            "rgba(255, 190, 123, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(255, 190, 123, 0)"
                                        );
                                        return gradient;
                                    },
                                    borderColor: "rgba(255, 190, 123, 0.1)",
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
                                    borderWidth: 1,
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
                                            "rgba(255, 163, 81, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(255, 163, 81, 0)"
                                        );
                                        return gradient;
                                    },
                                    borderColor: "rgba(255, 163, 81, 0.1)",
                                },
                                {
                                    label: "Weighted Average PB Ratio",
                                    data: data.datasets["weighted-average-pb"],
                                    borderWidth: 1,
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
                                            "rgba(255, 190, 123, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(255, 190, 123, 0)"
                                        );
                                        return gradient;
                                    },
                                    borderColor: "rgba(255, 190, 123, 0.1)",
                                },
                            ],
                        }}
                    />
                </TabsContent>
            </Tabs>
        </Card>
    );
};
export default PEPB;
