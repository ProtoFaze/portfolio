import React from "react";
import { animateScrolling } from "./interactions/animateScrolling";

function Footer(){

    return (
        <footer className="flex flex-col items-center justify-center py-10">
            <div className="h-[1px] w-full bg-light divide-solid"></div>
            <p className="text-light">Designed and Developed by</p>
            <p className="text-tertiary">Damon Ng Khai Weng</p>
            <a href="#top" className="text-secondary text-3xl font-semibold py-5"
            onClick={animateScrolling}
            >
                Back to top</a>
        </footer>
    )
};

export default Footer;