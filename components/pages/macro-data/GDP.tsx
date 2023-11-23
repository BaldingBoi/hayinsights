"use client";
import React, { useEffect, useState } from "react";
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
import { Bar, Chart } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    ChartTooltip,
    Legend
);
// import CPIJPY from "@/data/cpi-JPY.json";
// import CPIUSD from "@/data/cpi-USD.json";

import GDPJPY from "@/data/gdp-jpy.json";
import RateDataQuarterly from "@/data/rate-quarterly.json";

const USDDATA = RateDataQuarterly["Rate"].splice(-12);

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

const GDP = () => {
    const [label, setLabel] = useState<any>([]);
    const [datas, setDatas] = useState<any>({});

    const { messages, setOpenChat, addMessage, setLoading } =
        useChatStore() as ChatStore;

    useEffect(() => {
        setLabel(GDPJPY["Time"].slice(-12)),
            setDatas({
                jpy: GDPJPY["GDP"].slice(-12),
                usd: GDPJPY["GDP"]
                    .slice(-12)
                    .map((item, index) => item / USDDATA[index]),
            });
    }, []);

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
                            [
                                {
                                    label: "Japan Gross Domestic Product (GDP)",
                                    data: {
                                        time: GDPJPY["Time"].slice(-12),
                                        gdp: GDPJPY["GDP"].slice(-12),
                                    },
                                },
                                {
                                    label: "Exchange rates (USD/JPY)",
                                    data: {
                                        time: RateDataQuarterly["Time"].slice(
                                            -12
                                        ),
                                        rate: RateDataQuarterly["Rate"].slice(
                                            -12
                                        ),
                                    },
                                },
                            ]
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
        <Tabs defaultValue="JPY" className="flex flex-col gap-2">
            <div className="w-full flex items-center justify-between">
                <div className="font-semibold text-xl border-l-4 border-primary pl-2">
                    <div className="flex items-center gap-2">
                        <div>Gross Domestic Product (GDP)</div>
                        <TooltipProvider>
                            <Tooltip delayDuration={0}>
                                <TooltipTrigger>
                                    <HelpCircle className="text-yellow-500 rounded-full" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <div className="text-slate-600 w-[250px]">
                                        Gross Domestic Product (Expenditure
                                        approach) (Nominal) (2015 base)
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
                        <TabsTrigger value="JPY">JPY</TabsTrigger>
                        <TabsTrigger value="USD">USD</TabsTrigger>
                    </TabsList>
                </div>
            </div>
            <TabsContent value="JPY">
                <div className="w-full p-4">
                    <Bar
                        type="bar"
                        //@ts-ignore
                        options={{
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
                                        maxTicksLimit: 5,
                                    },
                                },
                                y: {
                                    display: true,
                                    grid: {
                                        display: false,
                                    },
                                    min: 500000,
                                },
                                y1: {
                                    display: true,
                                    position: "right",
                                    grid: {
                                        display: false,
                                    },
                                },
                            },
                        }}
                        data={{
                            labels: label,
                            datasets: [
                                {
                                    label: "Changes from previous quarter (%)",
                                    data: GDPJPY["Change"].slice(-12),
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
                                    label: "Gross Domestic Product (Billion JPY)",
                                    data: datas.jpy,
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
            <TabsContent value="USD">
                <div className="w-full p-4">
                    <Bar
                        type="bar"
                        //@ts-ignore
                        options={{
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
                                    min: 3500,
                                },
                                y1: {
                                    display: true,
                                    position: "right",
                                    grid: {
                                        display: false,
                                    },
                                },
                            },
                        }}
                        data={{
                            labels: label,
                            datasets: [
                                {
                                    label: "Changes from previous quarter (%)",
                                    data: GDPJPY["Change"].slice(-12),
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
                                    label: "Gross Domestic Product (Billion USD)",
                                    data: datas.usd,
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
        </Tabs>
    );
};

export default GDP;
