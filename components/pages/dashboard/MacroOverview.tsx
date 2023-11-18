"use client";
import React, { useEffect, useState } from "react";
import RateDataQuarterly from "@/data/rate-quarterly.json";
import CPIDataQuarterly from "@/data/cpi-quarterly.json";
import GDPJPY from "@/data/gdp-jpy.json";
import PEIPDataQuarterly from "@/data/peip-quarterly.json";

import { Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    Filler,
} from "chart.js";
import { Card } from "@/components/ui/card";
import { AreaChart, ArrowRight, Bot, ChevronRight } from "lucide-react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChatStore, useChatStore } from "@/store/chatStore";
const styleConfig = resolveConfig(tailwindConfig);
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
                maxTicksLimit: 2,
            },
            display: false,
        },
        y: {
            grid: {
                display: false,
            },
            display: false,
        },
    },
};
const MacroOverview = () => {
    const [labels, setLabels] = useState<string[]>([]);
    const [datas, setDatas] = useState<any>({});
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
                            {
                                time: labels,
                                data: [
                                    {
                                        label: "Exchange Rate (JPY/USD)",
                                        data: datas.rate,
                                    },
                                    {
                                        label: "Gross Domestic Product (GDP)",
                                        data: datas.gdp,
                                    },
                                    {
                                        label: "Consumer Price Index (CPI)",
                                        data: datas.cpi,
                                    },
                                    {
                                        label: "Producer Price Index",
                                        data: datas.pp,
                                    },
                                    {
                                        label: "Export Price Index",
                                        data: datas.ep,
                                    },
                                    {
                                        label: "Import Price Index",
                                        data: datas.ip,
                                    },
                                ],
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

    useEffect(() => {
        setLabels(RateDataQuarterly["Time"].slice(-12));
        setDatas({
            rate: RateDataQuarterly["Rate"].slice(-12).map((rate) => 1 / rate),
            gdp: GDPJPY["GDP"].slice(-12),
            cpi: CPIDataQuarterly["CPI"].slice(-12),
            pp: PEIPDataQuarterly["PP"].slice(-12),
            ep: PEIPDataQuarterly["EP"].slice(-12),
            ip: PEIPDataQuarterly["IP"].slice(-12),
        });
    }, []);
    return (
        <div className="flex-1 h-[calc(100dvh-48px)] p-1 flex flex-col gap-4 overflow-hidden">
            <div className="border-l-4 border-primary pl-2 text-xl flex w-full items-center justify-between">
                <Link href="/app/macro-data">
                    <div>Macroeconomics</div>
                </Link>
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
            <div className="w-full flex flex-col gap-4 items-center overflow-auto no-scrollbar pb-10">
                <Card className="flex flex-col gap-1 w-full items-start p-2">
                    <div className="text-xs flex items-center">
                        <AreaChart className="text-primary font-light" />
                        <div>Exchange Rate (JPY/USD)</div>
                    </div>

                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "JPY/USD",
                                    fill: true,
                                    data: datas.rate,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.yellow[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.yellow[100],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </Card>
                <Card className="flex flex-col gap-1 w-full items-start p-2">
                    <div className="text-xs flex items-center">
                        <AreaChart className="text-primary font-light" />
                        <div className="text-xs">
                            Gross Domestic Product (GDP)
                        </div>
                    </div>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "GDP",
                                    data: datas.gdp,
                                    fill: true,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.lime[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.lime[100],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </Card>
                <Card className="flex flex-col gap-1 w-full items-start p-2">
                    <div className="text-xs flex items-center">
                        <AreaChart className="text-primary font-light" />
                        <div className="text-xs">
                            Consumer Price Index (CPI)
                        </div>
                    </div>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "CPI",
                                    data: datas.cpi,
                                    fill: true,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.cyan[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.cyan[100],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </Card>
                <Card className="flex flex-col gap-1 w-full items-start p-2">
                    <div className="text-xs flex items-center">
                        <AreaChart className="text-primary font-light" />
                        <div className="text-xs">
                            Producer Price & Export/Import Price
                        </div>
                    </div>
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "Producer Price Index",
                                    data: datas.pp,
                                    fill: false,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.violet[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.violet[400],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                                {
                                    label: "Export Price Index",
                                    data: datas.ep,
                                    fill: false,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.orange[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.orange[400],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                                {
                                    label: "Import Price Index",
                                    data: datas.ip,
                                    fill: false,
                                    borderColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.rose[400],
                                    backgroundColor:
                                        //@ts-ignore
                                        styleConfig.theme?.colors?.rose[400],
                                    borderWidth: 2,
                                    tension: 0.4,
                                    pointBorderWidth: 0,
                                    pointBackgroundColor: "transparent",
                                },
                            ],
                        }}
                        options={chartOptions}
                    />
                </Card>
                <Link href="/app/macro-data" className="top-0">
                    <Button
                        className="m-auto rounded-full border-2 border-primary text-primary bg-transparent"
                        variant={"outline"}
                    >
                        <div>See more</div>
                        <ArrowRight />
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default MacroOverview;
