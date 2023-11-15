"use client";

import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export function Provider({ children }: React.PropsWithChildren) {
	const [client] = React.useState(
		new QueryClient({
			defaultOptions: {
				queries: {
					staleTime: 5 * (60 * 1000), // 5 mins
					cacheTime: 10 * (60 * 1000), // 10 mins
				},
			},
		})
	);

	return (
		<QueryClientProvider client={client}>{children}</QueryClientProvider>
	);
}
