import React from "react";

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

import PEIPQuaterly from "@/data/peip-quarterly.json";
import PEIPAnnual from "@/data/peip-annual.json";

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

const PEIP = () => {
	return (
		<Tabs defaultValue="quarterly" className="flex flex-col gap-2">
			<div className="w-full flex items-center justify-between">
				<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
					<div className="flex items-center gap-2">
						<div>Producer price and Export/Import price</div>
						<TooltipProvider>
							<Tooltip delayDuration={0}>
								<TooltipTrigger>
									<HelpCircle className="text-yellow-500 rounded-full" />
								</TooltipTrigger>
								<TooltipContent>
									<div className="w-[250px] text-slate-600">
										<ul>
											<li>
												- The Producer Price Index is
												based on surveyed prices of
												domestically-produced and
												domestically-traded goods in the
												corporate sector, mainly at the
												time of shipment by producers.
											</li>
											<li>
												- The Export Price Index is
												based on surveyed prices of
												exports at the time of shipment
												in the step of customs
												procedure.
											</li>
											<li>
												- The Import Price Index is
												based on surveyed prices of
												imports at the time of unloading
												in the step of customs
												procedure.
											</li>
										</ul>
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
					<Line
						data={{
							labels: PEIPQuaterly["Time"].slice(-12),
							datasets: [
								{
									label: "Producer Price Index",
									data: PEIPQuaterly["PP"].slice(-12),
									fill: false,
									borderColor: "#16A34A", //primary
									backgroundColor: "#16A34A", //primary
									borderWidth: 2,
									tension: 0.4,
									pointBorderWidth: 0,
									pointBackgroundColor: "transparent",
								},
								{
									label: "Export Price Index",
									data: PEIPQuaterly["EP"].slice(-12),
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
									data: PEIPQuaterly["IP"].slice(-12),
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
						//@ts-ignore
						options={chartOptions}
					/>
				</div>
			</TabsContent>
			<TabsContent value="annual">
				<div className="w-full p-4">
					<Line
						data={{
							labels: PEIPAnnual["Time"].slice(-6),
							datasets: [
								{
									label: "Producer Price Index",
									data: PEIPQuaterly["PP"].slice(-6),
									fill: false,
									borderColor: "#16A34A", //primary
									backgroundColor: "#16A34A", //primary
									borderWidth: 2,
									tension: 0.4,
									pointBorderWidth: 0,
									pointBackgroundColor: "transparent",
								},
								{
									label: "Export Price Index",
									data: PEIPQuaterly["EP"].slice(-6),
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
									data: PEIPQuaterly["IP"].slice(-6),
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
						//@ts-ignore
						options={chartOptions}
					/>
				</div>
			</TabsContent>
		</Tabs>
	);
};

export default PEIP;
