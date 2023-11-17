import React from "react";

const TextSlide = () => {
    return (
        <div className="min-h-screen w-full bg-primary flex items-center px-20">
            <div>
                <div className="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200">
                    We provide the most complete, accurate and intuitive
                    informations to
                </div>
                <div className="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-slate-200/60 to-50% to-slate-200 h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
                    support investors heading in the Japanese stock market using{" "}
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
        </div>
    );
};

export default TextSlide;
