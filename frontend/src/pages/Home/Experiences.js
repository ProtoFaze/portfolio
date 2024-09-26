import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Experiences(){
    const {loading, portfolioData} = useSelector((state) => state.root);
    const {experiences} = portfolioData;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return(
        <div id="experience" className="flex flex-col pr-20 py-20 sm:px-0">
            <SectionTitle title="Experiences"/>
            <div className="flex sm:flex-col py-10 gap-5">
                <div className="flex flex-col sm:flex-row sm:overflow-x-auto w-1/4 sm:w-full gap-10 border-l-2 border-tertiary-500 pl-2 ">
                    {experiences.map((experience, i) => (
                        <div onClick={()=> {setSelectedIndex(i);}} 
                        className="cursor-pointer">
                            <h1 className={`text-xl whitespace-nowrap ${selectedIndex === i ? 'text-tertiary border-l-4 border-tertiary bg-[#2c444d] rounded-sm -ml-3 w-min':'text-light'} p-2 `}>
                            {experience.startYear === experience.endYear ? 
                            `${experience.startMonth} - ${experience.endMonth}/${experience.endYear}` : 
                            (!experience.startMonth && !experience.startYear ? 
                            `${experience.startMonth}/${experience.startYear} - Present` : 
                            `${experience.startMonth}/${experience.startYear} - ${experience.endMonth}/${experience.endYear}`)}
                            </h1>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col w-3/4 sm:w-full gap-5">
                    <h1 className="text-secondary text-2xl"> {experiences[selectedIndex].title} </h1>
                    <h1 className="text-tertiary text-2xl"> {experiences[selectedIndex].entity} </h1>
                    <p className="text-white text-justify"> {experiences[selectedIndex].description}</p>
                </div>
            </div>
        </div>
    )
}

export default Experiences;