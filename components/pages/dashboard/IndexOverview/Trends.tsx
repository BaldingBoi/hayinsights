"use client";
import React, { use, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Line, Bar } from "react-chartjs-2";
import { formatDate } from "@/lib/date";
import { formatNumber } from "@/lib/number";
import { Loader2, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

const historicalChartOptions = {
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

const Trends = ({ stockData }: any) => {
    const [days, setDays] = useState("30");
    const [labels, setLabels] = useState<any>();
    const [chartData, setChartData] = useState<any>();
    const [topGain, setTopGain] = useState<any>();
    const [topLoss, setTopLoss] = useState<any>();

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["nikkei225Historical"],
        queryFn: async () => {
            const res = await fetch(`/api/nikkei225?days=${days}`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        if (stockData) {
            const newData = stockData
                .map((stock: any) => {
                    let change = Number(stock["Change %"].slice(1, -1));
                    if (stock["Change %"][0] !== "+") change = change * -1;
                    return {
                        ...stock,
                        changeInPercent: change,
                    };
                })
                .sort(
                    (a: any, b: any) => b.changeInPercent - a.changeInPercent
                );
            setTopGain(
                newData
                    .splice(0, 20)
                    .filter((item: any) => item.changeInPercent > 0)
            );
            setTopLoss(
                newData
                    .splice(-20)
                    .reverse()
                    .filter((item: any) => item.changeInPercent < 0)
            );
        }
    }, []);

    useEffect(() => {
        if (data) {
            setLabels(
                data.map((item: any) =>
                    formatDate(new Date(item["Date"]).getTime())
                )
            );
            setChartData(data.map((item: any) => item["Close"]));
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [days]);

    return (
        <div className="w-full h-full flex flex-col gap-4 overflow-auto">
            <Card className="w-full p-4 flex flex-col gap-1 justify-between max-h-1/2 h-fit">
                {chartData && (
                    <Tabs
                        value={days}
                        //@ts-ignore
                        onValueChange={(value: string) => setDays(value)}
                        className="flex w-full justify-between"
                    >
                        <div className="flex items-center gap-4">
                            {chartData.at(-1) > chartData.at(-2) ? (
                                <TrendingUp
                                    size={40}
                                    className="text-green-500"
                                />
                            ) : (
                                <TrendingDown
                                    size={40}
                                    className="text-red-500"
                                />
                            )}
                            <div className="text-3xl font-semibold flex items-center gap-1">
                                {formatNumber(chartData.at(-1), 2)}{" "}
                                <div
                                    className={cn(
                                        "text-xl",
                                        chartData.at(-1) > chartData.at(-2)
                                            ? "text-green-500"
                                            : "text-red-500"
                                    )}
                                >{`(${
                                    chartData.at(-1) > chartData.at(-2)
                                        ? "+"
                                        : "-"
                                }${formatNumber(
                                    Math.abs(
                                        (chartData.at(-1) - chartData.at(-2)) /
                                            chartData.at(-2)
                                    ) * 100,
                                    2
                                )}%)`}</div>
                            </div>
                            {isFetching && (
                                <Loader2 size={24} className="animate-spin" />
                            )}
                        </div>
                        <TabsList>
                            <TabsTrigger value="30">30D</TabsTrigger>
                            <TabsTrigger value="90">3M</TabsTrigger>
                            <TabsTrigger value="365">1Y</TabsTrigger>
                            <TabsTrigger value="1095">3Y</TabsTrigger>
                        </TabsList>
                    </Tabs>
                )}

                {chartData && (
                    <Line
                        data={{
                            labels: labels,
                            datasets: [
                                {
                                    label: "NIKKEI 225 Index Historical Data",
                                    data: chartData,
                                    fill: true,
                                    borderColor:
                                        chartData.at(-1) > chartData.at(-2)
                                            ? "rgba(34, 197, 94, 1)"
                                            : "rgba(239, 68, 68, 1)",
                                    backgroundColor: (
                                        context: ScriptableContext<"line">
                                    ) => {
                                        const ctx = context.chart.ctx;
                                        const gradient =
                                            ctx.createLinearGradient(
                                                0,
                                                0,
                                                0,
                                                300
                                            );
                                        gradient.addColorStop(
                                            0,
                                            chartData.at(-1) > chartData.at(-2)
                                                ? "rgba(34, 197, 94, 1)"
                                                : "rgba(239, 68, 68, 1)"
                                        );
                                        gradient.addColorStop(
                                            1,
                                            chartData.at(-1) > chartData.at(-2)
                                                ? "rgba(34, 197, 94, 0)"
                                                : "rgba(239, 68, 68, 0)"
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
                        //@ts-ignore
                        options={historicalChartOptions}
                    />
                )}
            </Card>
            <Card className="w-full p-4 flex flex-col gap-4 h-[350px]">
                <div className="w-full flex items-center justify-between text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <TrendingUp size={32} className="text-green-500" />
                        <div>Top Gain</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div>Top Loss</div>
                        <TrendingDown size={32} className="text-red-500" />
                    </div>
                </div>
                <div className="w-full flex justify-between gap-2 text-lightgray flex-1 overflow-auto no-scrollbar">
                    <div className="w-1/2 flex flex-col gap-1 ">
                        {topGain?.map((stock: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center justify-between text-xs p-1 h-10"
                                style={{
                                    background: `linear-gradient(-90deg, rgba(34, 197, 94, 1) 0%,  rgba(255,255,255,0) ${Math.ceil(
                                        (Math.abs(stock["changeInPercent"]) /
                                            7) *
                                            100
                                    )}%)`,
                                }}
                            >
                                <div className="flex items-center gap-2 ">
                                    {stock["Logo"] === "-" ? (
                                        <div className="w-10 h-10 bg-slate-300"></div>
                                    ) : (
                                        <Image
                                            src={stock["Logo"]}
                                            height={40}
                                            width={40}
                                            alt={stock["ID"]}
                                        />
                                    )}
                                    <div className="flex flex-col gap-0">
                                        <div>{stock["ID"]}</div>
                                        <div className="w-32 line-clamp-1">
                                            {stock["Name"]}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-end flex-col">
                                    <div className="font-semibold">
                                        ({stock["Change %"]})
                                    </div>
                                    <div>
                                        {stock["Price"].split(" ")[0] + "¥"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col gap-1">
                        {topLoss?.map((stock: any, index: number) => (
                            <div
                                key={index}
                                className="flex items-center justify-between text-xs flex-row-reverse p-1 h-10"
                                style={{
                                    background: `linear-gradient(90deg, rgba(239, 68, 68, 1) 0%,  rgba(255,255,255,0) ${Math.ceil(
                                        (Math.abs(stock["changeInPercent"]) /
                                            7) *
                                            100
                                    )}%)`,
                                }}
                            >
                                <div className="flex items-center gap-2 flex-row-reverse">
                                    {stock["Logo"] === "-" ? (
                                        <div className="w-10 h-10"></div>
                                    ) : (
                                        <Image
                                            src={stock["Logo"]}
                                            height={40}
                                            width={40}
                                            alt={stock["ID"]}
                                        />
                                    )}
                                    <div className="flex flex-col gap-0 text-right">
                                        <div>{stock["ID"]}</div>
                                        <div className="w-32 line-clamp-1">
                                            {stock["Name"]}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start flex-col">
                                    <div className="font-semibold">
                                        ({stock["Change %"]})
                                    </div>
                                    <div>
                                        {stock["Price"].split(" ")[0] + "¥"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Trends;
