"use client";
import React from "react";
import { Moon, Sun, SunMoon } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const ChangeTheme = () => {
    const { theme, setTheme } = useTheme();

    const getIcon = () => {
        switch (theme) {
            case "light":
                return <Sun size={20} />;
            case "dark":
                return <Moon size={20} />;
            default:
                return <Sun size={20} />;
        }
    };

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
            {getIcon()}
        </Button>
    );
};

export default ChangeTheme;
