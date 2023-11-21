"use client";
import React, { use, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
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
} from "chart.js";
import { Line } from "react-chartjs-2";
import { set } from "react-hook-form";
import { formatDate } from "@/lib/date";

ChartJS.register(
    CategoryScale,
    LinearScale,
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
    const [labels, setLabels] = useState<any>();
    const [chartData, setChartData] = useState<any>();

    const { data } = useQuery({
        queryKey: ["nikkei225Historical"],
        queryFn: async () => {
            const res = await fetch("/api/nikkei225");
            const data = await res.json();
            return data;
        },
    });

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

    return (
        <Card className="h-full w-full overflow-hidden p-4">
            <Line
                data={{
                    labels: labels,
                    datasets: [
                        {
                            label: "NIKKEI 225 Index Historical Data",
                            data: chartData,
                            fill: true,
                            borderColor: "#16A34A", //primary
                            backgroundColor: (
                                context: ScriptableContext<"line">
                            ) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(
                                    0,
                                    0,
                                    0,
                                    300
                                );
                                gradient.addColorStop(0, "rgba(22,163,74,1)");
                                gradient.addColorStop(1, "rgba(22,163,74,0)");
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
                options={chartOptions}
            />
        </Card>
    );
};

export default Trends;
