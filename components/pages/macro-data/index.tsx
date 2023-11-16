"use client";
import React, { Suspense } from "react";
import ExchangeRate from "./ExchangeRate";
import CPI from "./CPI";
import PEIP from "./PEIP";
import GDP from "./GDP";
import { BarChart4 } from "lucide-react";

const MacroData = () => {
	return (
		<div className="flex flex-col w-full p-4 lg:py-12 lg:px-24 gap-16">
			<div className="flex flex-col gap-4">
				<div className="flex items-center gap-2 text-3xl font-semibold">
					<BarChart4 size={32} />
					<div>Economic Data</div>
				</div>
				<div>
					Macroeconomic data encompasses key indicators like GDP, CPI,
					and more, offering a comprehensive view of an economy. It is
					used for policy formulation, investment decisions, business
					planning, risk assessment, and academic research. Analyzing
					these indicators helps individuals, businesses, and
					policymakers make informed decisions and understand economic
					trends.
				</div>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full ">
				<Suspense fallback={<div>...</div>}>
					<ExchangeRate />
				</Suspense>
				<Suspense fallback={<div>...</div>}>
					<GDP />
				</Suspense>

				<Suspense fallback={<div>...</div>}>
					<CPI />
				</Suspense>
				<Suspense fallback={<div>...</div>}>
					<PEIP />
				</Suspense>
			</div>
		</div>
	);
};

export default MacroData;
