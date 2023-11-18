import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const TextSlide = () => {
    return (
        <div className="min-h-screen w-full bg-primary px-20 flex flex-col items-start justify-center gap-4">
            <div className="w-full">
                <div className="font-extrabold text-2xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
                    We provide the most complete, accurate and intuitive
                    informations to
                </div>
                <div className="block font-extrabold text-2xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200 h-[calc(theme(fontSize.2xl)*theme(lineHeight.tight))] overflow-hidden">
                    <span>
                        support investors heading into the Japanese stock market
                        using{" "}
                    </span>
                    <span className="text-black inline-flex flex-col">
                        <ul className="animate-text-slide-3 block text-left leading-tight [&_li]:block ">
                            <li>Fundamental Analysis</li>
                            <li>Top-down Approach</li>
                            <li>Artificial Intelligence</li>
                            <li aria-hidden="true">Fundamental Analysis</li>
                        </ul>
                    </span>
                </div>
            </div>
            <Link href={"/app"}>
                <Button
                    className="flex items-center gap-1 font-2xl rounded-full bg-transparent text-white hover:bg-transparent hover:text-black hover:border-black"
                    variant={"outline"}
                >
                    <div>Let's Go</div>
                    <ArrowRight />
                </Button>
            </Link>
        </div>
    );
};

export default TextSlide;
