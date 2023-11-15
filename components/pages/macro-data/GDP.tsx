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
// import CPIJPY from "@/data/cpi-JPY.json";
// import CPIUSD from "@/data/cpi-USD.json";

import GDPJPY from "@/data/gdp-jpy.json";
import RateDataQuarterly from "@/data/rate-quarterly.json";

const USDDATA = RateDataQuarterly["Rate"].splice(-12);

const GDPUSDData = GDPJPY["GDP"].splice(-12).map((item, index) => {
	return item / USDDATA[index];
});

//@ts-ignore
import merge from "lodash.merge";

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

const GDP = () => {
	return (
		<Tabs defaultValue="JPY" className="flex flex-col gap-2">
			<div className="w-full flex items-center justify-between">
				<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
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
					<Button
						variant={"ghost"}
						className="flex items-center gap-2"
					>
						<Bot />
						<div>Analyze with AI</div>
					</Button>
					<TabsList>
						<TabsTrigger value="JPY">JPY</TabsTrigger>
						<TabsTrigger value="USD">USD</TabsTrigger>
					</TabsList>
				</div>
			</div>
			<TabsContent value="JPY">
				<div className="w-full p-4">
					<Chart
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
							labels: GDPJPY["Time"].slice(-12),
							datasets: [
								{
									label: "Changes from previous quarter (%)",
									data: GDPJPY["Change"].slice(-12),
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
									data: GDPJPY["GDP"].slice(-12),
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
				</div>
			</TabsContent>
			<TabsContent value="USD">
				<div className="w-full p-4">
					<Chart
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
							labels: GDPJPY["Time"].slice(-12),
							datasets: [
								{
									label: "Changes from previous quarter (%)",
									data: GDPJPY["Change"].slice(-12),
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
									data: GDPUSDData,
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
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default GDP;
