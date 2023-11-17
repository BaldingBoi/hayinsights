import React from "react";
import TextSlide from "./TextSlide";
import Macro from "./Macro";
import Market from "./Market";

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-start gap-20 w-full h-full">
            <TextSlide />
            <Macro />
            <Market />
        </div>
    );
};

export default Home;
