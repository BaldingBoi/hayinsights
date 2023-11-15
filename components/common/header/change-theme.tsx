"use-clientt";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ChangeTheme = () => {
	const { theme, setTheme } = useTheme();

	return (
		<Button
			onClick={
				theme === "light"
					? () => setTheme("dark")
					: () => setTheme("light")
			}
			variant={"outline"}
			size={"icon"}
			className="border-none"
		>
			{theme === "light" ? (
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			) : (
				<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			)}
		</Button>
	);
};

export default ChangeTheme;
