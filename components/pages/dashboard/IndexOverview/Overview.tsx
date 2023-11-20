"use client";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";
const styleConfig = resolveConfig(tailwindConfig);
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const Overview = ({ stockData }: any) => {
    const [data, setData] = useState<any>([]);
    useEffect(() => {
        if (stockData) {
            const newData = stockData.map((stock: any) => {
                let change = Number(stock["Change %"].slice(1, -1));
                if (stock["Change %"][0] !== "+") change = change * -1;
                return {
                    x: stock["ID"],
                    y: change,
                };
            });
            setData(newData);
        }
    }, []);
    return (
        <Card className="h-full overflow-hidden p-4 pr-1">
            {data.length > 0 && (
                <Chart
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
                                fontSize: "8px",
                            },
                            //@ts-ignore
                            formatter: function (text: string, op: any) {
                                return [text, `${op.value}%`];
                            },
                            offsetY: -6,
                        },
                        plotOptions: {
                            treemap: {
                                enableShades: true,
                                shadeIntensity: 0.5,
                                reverseNegativeShade: true,
                                useFillColorAsStroke: true,
                                colorScale: {
                                    ranges: [
                                        {
                                            from: -10,
                                            to: 0,
                                            color:
                                                // @ts-ignore
                                                styleConfig.theme.colors
                                                    .red[500],
                                        },
                                        {
                                            from: 0.001,
                                            to: 10,
                                            color:
                                                //@ts-ignore
                                                styleConfig.theme.colors
                                                    .green[500],
                                        },
                                    ],
                                },
                            },
                        },
                    }}
                    series={[
                        {
                            data: data || [],
                        },
                    ]}
                    height={"100%"}
                    width={"100%"}
                />
            )}
        </Card>
    );
};

export default Overview;
