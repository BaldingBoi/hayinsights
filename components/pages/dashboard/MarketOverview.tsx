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

import PEPB from "./MarketOverview/PEPB";

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
import TVL from "./MarketOverview/TVL";
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
    return (
        <div className="flex-1 h-[calc(100dvh-48px)] col-span-2 flex flex-col gap-4 p-1">
            <div className="border-l-4 border-primary pl-2 text-xl flex w-full items-center justify-between">
                <Link href="/app/stocks">
                    <div>Market Statistic Overview</div>
                </Link>
            </div>
            <div className="h-full flex flex-col gap-4 overflow-auto no-scrollbar">
                <TVL />
                <PEPB />
            </div>
        </div>
    );
};

export default MarketOverview;
