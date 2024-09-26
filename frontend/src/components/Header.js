import React from "react";
import { animateScrolling } from "./interactions/animateScrolling";

function Header(){
    return (
        <div id="top" className = "p-5 bg-primary flex justify-between sticky">
            <a href="#top">
                <img id="header-logo" className="h-8 w-auto" src='/logo.svg' alt="logo"/>
            </a>
            <a href="#about" className="text-secondary text-3xl font-semibold" onClick={animateScrolling}>About me</a>
            <a href="#experience" className="text-tertiary text-3xl font-semibold" onClick={animateScrolling}>Experience</a>
        </div>
    )
}

export default Header