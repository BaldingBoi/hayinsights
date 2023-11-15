import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);
import CPIData from "@/data/cpi.json";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";

const styleConfig = resolveConfig(tailwindConfig);

const CPI = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="w-full flex items-center justify-between">
				<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
					Consumer Price Index (CPI)
				</div>
				<Button variant={"link"} className="text-sm flex items-center">
					<div>See Details</div>
					<ChevronRight />
				</Button>
			</div>
			<div className="w-full text-slate-600">
				The index which aims to measure the average price change in the
				purchases of goods and services by households nationwide
			</div>
			<div className="w-full p-4">
				<Chart
					type="line"
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
								min: 95,
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
						labels: CPIData["Time"].slice(-36),
						datasets: [
							{
								label: "Change from the same time period of previous year (%)",
								data: CPIData["Change"].slice(-36),
								type: "line",
								fill: false,
								borderColor: "black",
								tension: 0.4,
								pointBorderWidth: 0,
								pointBackgroundColor: "transparent",
								yAxisID: "y1",
								borderWidth: 2,
							},
							{
								label: "Consumer Price Index",
								data: CPIData["CPI"].slice(-36),
								borderWidth: 2,
								backgroundColor: "transparent",
								borderColor: "#16A34A",
								type: "bar",
								yAxisID: "y",
							},
						],
					}}
				/>
			</div>
		</div>
	);
};

export default CPI;
