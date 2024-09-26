import React from "react";
import { useSelector } from "react-redux";

function Landing(){
    const {loading, portfolioData} = useSelector((state) => state.root);
    const {landing} = portfolioData;
    const {welcomeText, firstName, lastName, caption, description} = landing;
    return(
        // make the background translucent and aligned to the right
        <div className="h-[80vh] flex flex-row sm:flex-col sm:justify-center items-center">
            <div className="relative flex z-10 w-2/3 sm:w-full flex-col items-start justify-center gap-7 py-10">
                <h1 className="text-light">{welcomeText || ''}</h1>
                <h1 className="text-7xl sm:text-3xl text-secondary font-semibold">{firstName || ''} {lastName || ''}</h1>
                <h1 className="text-6xl sm:text-2xl text-light font-semibold">{caption || ''}</h1>
                <p className="text-light">
                    {description || ''}
                </p>
                <button className="border-2 border-light text-light px-10 py-3 rounded-lg">Get started</button>
            </div>
            <img className="absolute right-0 opacity-70 sm:opacity-30 flex w-1/3 sm:w-full blur-sm"
             src="https://avatars.githubusercontent.com/u/110209956?v=4" 
             alt="lofi-graphic"/>
        </div>
    )
}

export default Landing

