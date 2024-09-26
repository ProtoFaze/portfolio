import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Projects(){
    const {
        // loading,
         portfolioData} = useSelector((state) => state.root);
    const {projects} = portfolioData;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return(
        <div className="flex flex-col pr-20 py-20 sm:px-0">
        <SectionTitle title="Projects"/>
        <div className="flex sm:flex-col py-10 gap-10">
            <div className="flex flex-col sm:flex-row sm:overflow-x-auto w-1/4 sm:w-full gap-10 border-l-2 border-tertiary-500 pl-2 ">
                {projects.map((project, i) => (
                    <div onClick={()=> {setSelectedIndex(i);}} 
                    className="cursor-pointer">
                        <h1 className={`text-xl whitespace-nowrap ${selectedIndex === i ? 'text-tertiary border-l-4 border-tertiary bg-[#2c444d] rounded-sm -ml-3 w-min':'text-light'} p-2 `}>
                        {project.title}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="flex w-72 sm:w-full items-center justify-center">
            {projects[selectedIndex].image.includes("figma") ? 
                <iframe title="Figma design" className="flex justify-center h-80 w-full" src={projects[selectedIndex].image} allowFullScreen></iframe> :
                <img className="w-full h-auto rounded-md" src={projects[selectedIndex].image} alt={projects[selectedIndex].title}/>
                }
            </div>
            <div className="flex flex-col w-3/4 sm:w-full gap-5">
                <h1 className="text-secondary text-2xl"> {projects[selectedIndex].title} </h1>
                <h1 className="text-light text-xl text-justify"> {projects[selectedIndex].description} </h1>
                <div className="flex flex-row flex-wrap gap-5">
                    {projects[selectedIndex].skills.map((skill) => (
                        <p className="text-white text-2xl"> {skill} </p>
                    ))}
                </div>
                <a href={projects[selectedIndex].link} target="_blank" rel="noreferrer">
                    <button className="border-2 border-tertiary text-tertiary px-5 py-2 rounded-lg hover:border-secondary hover:bg-secondary hover:text-dark duration-200 ease-in">
                        View Project
                    </button>
                </a>
            </div>
        </div>
    </div>
    )
}

export default Projects;