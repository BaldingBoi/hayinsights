import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const PPEPIP = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="w-full flex items-center justify-between">
				<div className="font-semibold text-2xl border-l-4 border-primary pl-2">
					Producer price and Export/Import price
				</div>
				<Button variant={"link"} className="text-sm flex items-center">
					<div>See Details</div>
					<ChevronRight />
				</Button>
			</div>
			<div className="w-full text-slate-600">
				<ul>
					<li>
						The Producer Price Index is based on surveyed prices of
						domestically-produced and domestically-traded goods in
						the corporate sector, mainly at the time of shipment by
						producers.
					</li>
					<li>
						The Export Price Index is based on surveyed prices of
						exports at the time of shipment in the step of customs
						procedure.
					</li>
					<li>
						The Import Price Index is based on surveyed prices of
						imports at the time of unloading in the step of customs
						procedure.
					</li>
				</ul>
			</div>
			<div className="w-full p-4"></div>
		</div>
	);
};

export default PPEPIP;
