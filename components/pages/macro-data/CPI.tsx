import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, ChevronRight, HelpCircle } from "lucide-react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip as ChartTooltip,
	Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
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
			min: 80,
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
	return (
		<Tabs defaultValue="quarterly" className="flex flex-col gap-2">
			<div className="w-full flex items-center justify-between">
				<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
					<div className="flex items-center gap-2">
						<div>Consumer Price Index (CPI)</div>
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
					<Button
						variant={"ghost"}
						className="flex items-center gap-2"
					>
						<Bot />
						<div>Analyze with AI</div>
					</Button>
					<TabsList>
						<TabsTrigger value="quarterly">Quarterly</TabsTrigger>
						<TabsTrigger value="annual">Annual</TabsTrigger>
					</TabsList>
				</div>
			</div>
			<TabsContent value="quarterly">
				<div className="w-full p-4">
					<Chart
						type="bar"
						//@ts-ignore
						options={chartOptions}
						data={{
							labels: CPIQuarterly["Time"].slice(-12),
							datasets: [
								{
									label: "Change from the same time period of previous year (%)",
									data: CPIQuarterly["Change"].slice(-12),
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
									type: "bar",
									yAxisID: "y",
								},
							],
						}}
					/>
					;
				</div>
			</TabsContent>
			<TabsContent value="annual">
				<div className="w-full p-4">
					<Chart
						type="bar"
						//@ts-ignore
						options={chartOptions}
						data={{
							labels: CPIAnnual["Time"].slice(-6),
							datasets: [
								{
									label: "Change from the same time period of previous year (%)",
									data: CPIAnnual["Change"].slice(-6),
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
									type: "bar",
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
