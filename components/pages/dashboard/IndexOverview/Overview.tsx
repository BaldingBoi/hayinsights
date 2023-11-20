"use client";
import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
const styleConfig = resolveConfig(tailwindConfig);
import { Card } from "@/components/ui/card";

const Overview = () => {
    return (
        <Card className="h-full overflow-hidden p-4 pr-1">
            <ApexChart
                type="treemap"
                options={{
                    legend: {
                        show: false,
                    },
                    chart: {
                        type: "treemap",
                    },
                    title: {},
                    dataLabels: {
                        enabled: true,
                        style: {
                            fontSize: "12px",
                        },
                        //@ts-ignore
                        formatter: function (text: string, op: any) {
                            return [text, op.value];
                        },
                        offsetY: -6,
                    },
                    plotOptions: {
                        treemap: {
                            enableShades: true,
                            shadeIntensity: 0.5,
                            reverseNegativeShade: true,
                            colorScale: {
                                ranges: [
                                    {
                                        from: -10,
                                        to: 0,
                                        color:
                                            // @ts-ignore
                                            styleConfig.theme.colors.red[500],
                                    },
                                    {
                                        from: 0.001,
                                        to: 10,
                                        color:
                                            //@ts-ignore
                                            styleConfig.theme.colors.green[500],
                                    },
                                ],
                            },
                        },
                    },
                }}
                series={[
                    {
                        data: [
                            {
                                x: "INTC",
                                y: 1.2,
                            },
                            {
                                x: "GS",
                                y: 0.4,
                            },
                            {
                                x: "CVX",
                                y: -1.4,
                            },
                            {
                                x: "GE",
                                y: 2.7,
                            },
                            {
                                x: "CAT",
                                y: -0.3,
                            },
                            {
                                x: "RTX",
                                y: 5.1,
                            },
                            {
                                x: "CSCO",
                                y: -2.3,
                            },
                            {
                                x: "JNJ",
                                y: 2.1,
                            },
                            {
                                x: "PG",
                                y: 0.3,
                            },
                            {
                                x: "TRV",
                                y: 0.12,
                            },
                            {
                                x: "MMM",
                                y: -2.31,
                            },
                            {
                                x: "NKE",
                                y: 3.98,
                            },
                            {
                                x: "IYT",
                                y: 1.67,
                            },
                        ],
                    },
                ]}
                height={"100%"}
            />
        </Card>
    );
};

export default Overview;
