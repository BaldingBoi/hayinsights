"use client";
import Image from "next/image";
import Logo from "@/public/logo-lite.svg";
import ChangeTheme from "./change-theme";
import { Search } from "./search";
import Link from "next/link";
import { BarChart4, CandlestickChart, List } from "lucide-react";

const Header = () => {
    return (
        <div className="sticky top-0 flex items-center justify-between px-8 py-1 w-screen bg-white dark:bg-black z-50">
            <Link
                href={"/app"}
                className="flex items-center gap-4 cursor-pointer"
            >
                {/* <Image src={Logo} width={32} height={32} alt="logo" /> */}
                <div className="text-2xl font-bold">JP Stock Demo</div>
            </Link>
            <div className="flex items-center gap-10">
                <Link
                    href="/app/macro-data"
                    className="flex items-center gap-1 text-primary"
                >
                    <BarChart4 />
                    <div>Economic Data</div>
                </Link>
                <Link
                    href="/app/stocks"
                    className="flex items-center gap-1 text-primary"
                >
                    <CandlestickChart />
                    <div>Stock Market</div>
                </Link>
                <Link
                    href="/app/indexs"
                    className="flex items-center gap-1 text-primary"
                >
                    <List />
                    <div>Indexs</div>
                </Link>

                {/* <Search /> */}
                <ChangeTheme />
            </div>
        </div>
    );
};

export default Header;
