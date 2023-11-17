"use client";
import Image from "next/image";
import Logo from "@/public/logo-lite.svg";
import ChangeTheme from "./change-theme";
import { Search } from "./search";
import Link from "next/link";
import { BarChart4, CandlestickChart } from "lucide-react";

const Header = () => {
    return (
        <div className="sticky top-0 flex items-center justify-between px-5 py-4 w-screen bg-white dark:bg-black z-50">
            <Link href={"/"} className="flex items-center gap-4 cursor-pointer">
                {/* <Image src={Logo} width={32} height={32} alt="logo" /> */}
                <div className="text-2xl font-bold">JP Stock Demo</div>
            </Link>
            <div className="flex items-center gap-10">
                <Link
                    href="/macro-data"
                    className="flex items-center gap-1 text-primary"
                >
                    <BarChart4 />
                    <div>Economic Data</div>
                </Link>
                <Link
                    href="/stocks"
                    className="flex items-center gap-1 text-primary"
                >
                    <CandlestickChart />
                    <div>Stock Market</div>
                </Link>

                {/* <Search /> */}
                <ChangeTheme />
            </div>
        </div>
    );
};

export default Header;
