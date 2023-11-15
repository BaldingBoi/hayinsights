"use client";

import Header from "@/components/common/header";
import MacroData from "@/components/pages/macro-data";

export default function App() {
	return (
		<main className="flex h-[100dvh] w-[100svw] flex-col items-center gap-2 overflow-x-hidden relative">
			<Header />
			<MacroData />
		</main>
	);
}
