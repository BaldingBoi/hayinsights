"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
    Bot,
    ChevronRight,
    FileDown,
    HelpCircle,
    ImageDown,
} from "lucide-react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
} from "chart.js";
import { Chart, Bar } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend
);
import CPIQuarterly from "@/data/cpi-quarterly.json";
import CPIAnnual from "@/data/cpi-annual.json";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
import { ChatStore, useChatStore } from "@/store/chatStore";

const styleConfig = resolveConfig(tailwindConfig);

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
            min: 96,
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

const CPI = () => {
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
                            {
                                label: "Japan Consumer Price Index (CPI)",
                                data: {
                                    annual: {
                                        time: CPIAnnual["Time"].slice(-6),
                                        rate: CPIAnnual["CPI"].slice(-6),
                                    },
                                    quarterly: {
                                        time: CPIQuarterly["Time"].slice(-12),
                                        rate: CPIQuarterly["CPI"].slice(-12),
                                    },
                                },
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
                        <div className="w-fit">Consumer Price Index (CPI)</div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <HelpCircle className="text-yellow-500 rounded-full" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="text-slate-600 w-[250px]">
                                        The index which aims to measure the
                                        average price change in the purchases of
                                        goods and services by households
                                        nationwide
                                    </div>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
                <div className="flex items-center gap-4">
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
            <TabsContent value="quarterly">
                <div className="w-full p-4">
                    <Bar
                        //@ts-ignore
                        options={chartOptions}
                        data={{
                            labels: CPIQuarterly["Time"].slice(-12),
                            datasets: [
                                {
                                    label: "Changes from the same time period of previous year (%)",
                                    data: CPIQuarterly["Change"].slice(-12),
                                    //@ts-ignore
                                    type: "line",
                                    fill: false,
                                    borderColor: "#16A34A",
                                    backgroundColor: "#16A34A",
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                    yAxisID: "y1",
                                    borderWidth: 2,
                                },
                                {
                                    label: "Consumer Price Index",
                                    data: CPIQuarterly["CPI"].slice(-12),
                                    borderWidth: 0,
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.slate[300],
                                    borderColor: "transparent",
                                    yAxisID: "y",
                                },
                            ],
                        }}
                    />
                </div>
            </TabsContent>
            <TabsContent value="annual">
                <div className="w-full p-4">
                    <Bar
                        type="bar"
                        //@ts-ignore
                        options={chartOptions}
                        data={{
                            labels: CPIAnnual["Time"].slice(-6),
                            datasets: [
                                {
                                    label: "Changes from the same time period of previous year (%)",
                                    data: CPIAnnual["Change"].slice(-6),
                                    //@ts-ignore
                                    type: "line",
                                    fill: false,
                                    borderColor: "#16A34A",
                                    backgroundColor: "#16A34A",
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                    yAxisID: "y1",
                                    borderWidth: 2,
                                },
                                {
                                    label: "Consumer Price Index",
                                    data: CPIAnnual["CPI"].slice(-6),
                                    borderWidth: 0,
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.slate[300],
                                    borderColor: "transparent",
                                    yAxisID: "y",
                                },
                            ],
                        }}
                    />
                    ;
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default CPI;
