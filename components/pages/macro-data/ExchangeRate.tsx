"use client";
import React, { use, useEffect, useState } from "react";
import RateDataQuarterly from "@/data/rate-quarterly.json";
import RateDataAnnual from "@/data/rate-annual.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
    Bot,
    ChevronRight,
    Download,
    FileDown,
    HelpCircle,
    ImageDown,
} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    ScriptableContext,
    Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChatStore, useChatStore } from "@/store/chatStore";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    ChartTooltip,
    Legend,
    Filler
);

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
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
            grid: {
                display: false,
            },
        },
    },
};

const ExchangeRate = ({ exchangeRateData }: any) => {
    const { messages, setOpenChat, addMessage, setLoading } =
        useChatStore() as ChatStore;

    const [labels, setLabels] = useState<any>({});
    const [datas, setDatas] = useState<any>({});

    useEffect(() => {
        setLabels({
            quarterly: exchangeRateData.quarterly.time,
            annual: exchangeRateData.annual.time,
        });

        setDatas({
            quarterly: exchangeRateData.quarterly.rate,
            annual: exchangeRateData.annual.rate,
        });
    }, [exchangeRateData]);

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
                            {
                                label: "Exchange rates (JPY/USD)",
                                data: exchangeRateData,
                            }
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
        <Tabs defaultValue="quarterly" className="flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
                <div className="font-semibold text-xl border-l-4 border-primary pl-2">
                    <div className="flex items-center gap-2">
                        <div>Exchange rates (JPY/USD)</div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <HelpCircle className="text-yellow-500 rounded-full" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="w-[250px] text-slate-600">
                                        Tokyo market interbank rates (Yen/U.S.
                                        dollar) spot as of 5:00 PM(JST)／end of
                                        month
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4">
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
                    {/* <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                                <FileDown size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <div>Export data</div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger>
                                <ImageDown size={20} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <div>Capture chart</div>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider> */}
                    <TabsList>
                        <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                        <TabsTrigger value="annual">Annual</TabsTrigger>
                    </TabsList>
                </div>
            </div>

            <TabsContent value="quarterly" id="chart">
                <div className="w-full p-4">
                    <Line
                        data={{
                            labels: labels.quarterly,
                            datasets: [
                                {
                                    label: "JPY/USD",
                                    data: datas.quarterly,
                                    fill: false,
                                    borderColor: "#16A34A", //primary
                                    backgroundColor: (
                                        context: ScriptableContext<"line">
                                    ) => {
                                        const ctx = context.chart.ctx;
                                        const gradient =
                                            ctx.createLinearGradient(
                                                0,
                                                0,
                                                0,
                                                350
                                            );
                                        gradient.addColorStop(
                                            0,
                                            "rgba(22,163,74,1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(22,163,74,0)"
                                        );
                                        return gradient;
                                    },
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </div>
            </TabsContent>
            <TabsContent value="annual">
                <div className="w-full p-4">
                    <Line
                        data={{
                            labels: labels.annual,
                            datasets: [
                                {
                                    label: "JPY/USD",
                                    data: datas.annual,
                                    fill: false,
                                    borderColor: "#16A34A", //primary
                                    backgroundColor: (
                                        context: ScriptableContext<"line">
                                    ) => {
                                        const ctx = context.chart.ctx;
                                        const gradient =
                                            ctx.createLinearGradient(
                                                0,
                                                0,
                                                0,
                                                350
                                            );
                                        gradient.addColorStop(
                                            0,
                                            "rgba(22,163,74,1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            "rgba(22,163,74,0)"
                                        );
                                        return gradient;
                                    },
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default ExchangeRate;
