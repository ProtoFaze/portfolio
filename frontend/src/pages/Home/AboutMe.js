import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function AboutMe() {
    const {loading, portfolioData} = useSelector((state) => state.root);
    const {about} = portfolioData;
    const {lottieURL, description1, description2, skills} = about;

    return (
        <div id="about">
            <SectionTitle title="About Me" />
            <div className="flex sm:flex-col items-center">
                <div className="h-[70vh] w-1/3 sm:w-full">
                    <lottie-player
                        src={lottieURL}
                        background="Transparent"
                        speed="1"
                        autoplay direction="1" mode="normal">
                    </lottie-player>
                </div>
                <div className="flex flex-col gap-5 w-2/3 sm:w-full">
                    <p className="text-light text-justify">
                        {description1}
                    </p>
                    <p className="text-light text-justify">
                        {description2}
                    </p>
                </div>
            </div>
            <div>
                <h1 className="text-light text-xl py-2">
                    Some Tech that i use:
                </h1>
                <div className="flex flex-wrap gap-10">
                    {skills.map((skill) => (
                        <div key = {skill._id}className="border bg-light py-3 px-8 rounded-xl">
                            <h1 className="text-2xl">{skill}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default AboutMe