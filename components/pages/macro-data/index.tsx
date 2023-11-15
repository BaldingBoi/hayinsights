import React from "react";
import ExchangeRate from "./ExchangeRate";
import CPI from "./CPI";
import PPEPIP from "./PPEPIP";

const MacroData = () => {
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-16 w-full p-4 lg:py-12 lg:px-24">
			<ExchangeRate />
			<CPI />
			<PPEPIP />
		</div>
	);
};

export default MacroData;
