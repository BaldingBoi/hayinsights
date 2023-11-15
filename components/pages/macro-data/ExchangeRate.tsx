import React from "react";
import RateDataQuarterly from "@/data/rate-quarterly.json";
import RateDataAnnual from "@/data/rate-annual.json";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Bot, ChevronRight, HelpCircle } from "lucide-react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip as ChartTooltip,
	Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config.js";

const styleConfig = resolveConfig(tailwindConfig);

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

const ExchangeRate = () => {
	return (
		<div className="flex flex-col gap-2">
			<Tabs defaultValue="quarterly">
				<div className="w-full flex items-center justify-between">
					<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
						<div className="flex items-center gap-2">
							<div>Exchange rates (USD/JPY)</div>
							<TooltipProvider>
								<Tooltip delayDuration={0}>
									<TooltipTrigger>
										<HelpCircle className="text-yellow-500 rounded-full" />
									</TooltipTrigger>
									<TooltipContent>
										<div className="w-full text-slate-600">
											Tokyo market interbank rates (U.S.
											dollar/Yen) spot as of 5:00
											PM(JST)／end of month
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
							<TabsTrigger value="quarterly">
								Quarterly
							</TabsTrigger>
							<TabsTrigger value="annual">Annual</TabsTrigger>
						</TabsList>
					</div>
				</div>
				<TabsContent value="quarterly">
					<div className="w-full p-4">
						<Line
							data={{
								labels: RateDataQuarterly["Time"].slice(-12),
								datasets: [
									{
										label: "USD/JPY",
										data: RateDataQuarterly["Rate"].slice(
											-12
										),
										fill: false,
										borderColor: "#16A34A", //primary
										borderWidth: 2,
										tension: 0.4,
										pointBorderWidth: 0,
										pointBackgroundColor: "transparent",
									},
								],
							}}
							options={chartOptions}
						/>
					</div>
				</TabsContent>
				<TabsContent value="annual">
					<div className="w-full p-4">
						<Line
							data={{
								labels: RateDataAnnual["Time"].slice(-6),
								datasets: [
									{
										label: "USD/JPY",
										data: RateDataAnnual["Rate"].slice(-6),
										fill: false,
										borderColor: "#16A34A", //primary
										borderWidth: 2,
										tension: 0.4,
										pointBorderWidth: 0,
										pointBackgroundColor: "transparent",
									},
								],
							}}
							options={chartOptions}
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ExchangeRate;
