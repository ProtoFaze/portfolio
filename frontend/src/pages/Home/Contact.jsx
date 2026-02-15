import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Contact(){
    const {portfolioData} = useSelector((state) => state.root);
    const {contact} = portfolioData;
    return(
        <div className="flex flex-col items-start py-10 text-sm">
            <SectionTitle title="A little more about me"/>
            <div className="flex sm:flex-col gap-10 items-center">
                <div className="flex flex-col text-sm"> 
                    <h1 className="text-light">{`{`}</h1>
                    {Object.keys(contact).map((key) => (
                        key !=='_id' && 
                        (<h1>
                            <span className="text-light ml-10">"{key}" : </span> 
                            {Array.isArray(contact[key]) ? (
                                <ul className="text-light ml-28">
                                    {"["}
                                    {contact[key].map((item, index) => (
                                        <li key={index}>
                                            <span className="text-light ml-5">"{item.title}" : </span> <a href={item.link} className="text-light underline">"{item.link}"</a>
                                        </li>
                                    ))}
                                    {"]"}
                                </ul>
                            ) : (
                                <span className="text-light">"{contact[key]}"</span>
                            )}
                        </h1>)
                    ))}
                    <h1 className="text-light">{`}`}</h1>
                </div>
                <div className=" h-80">
                    <lottie-player 
                    className="h-full" 
                    src="https://lottie.host/d08fb973-4df4-4382-af6a-a774d2e28835/cGrQ6DpuNq.json" 
                    speed="1"  
                    autoplay 
                    direction="1" 
                    mode="normal"></lottie-player>
                </div>
            </div>
        </div>
    )
}

export default Contact;