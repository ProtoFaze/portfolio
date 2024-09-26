import React from "react";
import SectionTitle from "../../components/SectionTitle";
import { useSelector } from "react-redux";

function Courses(){
    const {loading, portfolioData} = useSelector((state) => state.root);
    const {courses} = portfolioData;
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    return(
        <div className="flex flex-col py-20 sm:px-0">
        <SectionTitle title="Courses"/>
        <div className="flex sm:flex-col py-10 gap-20">
            <div className="flex flex-col sm:flex-row sm:overflow-x-auto w-1/4 sm:w-full gap-10 border-l-2 border-tertiary-500 pl-2 ">
                {courses.map((course, i) => (
                    <div onClick={()=> {setSelectedIndex(i);}} 
                    className="cursor-pointer">
                        <h1 className={`text-xl sm:whitespace-nowrap ${selectedIndex === i ? 'text-tertiary border-l-4 border-tertiary bg-[#2c444d] rounded-sm -ml-3':'text-light'} p-2 `}>
                        {course.title}
                        </h1>
                    </div>
                ))}
            </div>
            <div className="flex flex-col w-2/4 sm:w-full gap-5">
                <h1 className="text-secondary text-2xl"> {courses[selectedIndex].title} </h1>
                <h1 className="text-light text-xl text-justify"> {courses[selectedIndex].description} </h1>
                <div className="flex flex-row flex-wrap gap-5">
                    {courses[selectedIndex].skills.map((skill) => (
                        <p className="text-light text-2xl"> {skill} </p>
                    ))}
                </div>
                <a href={courses[selectedIndex].link} target="_blank" rel="noreferrer">
                    <button className="border-2 border-tertiary text-tertiary px-5 py-2 rounded-lg hover:border-secondary hover:bg-secondary hover:text-dark duration-200 ease-in">View Course</button>
                </a>
            </div>
            <div className="flex w-1/4 sm:w-full items-center justify-center">
                <img className="w-full h-auto rounded-md" src={courses[selectedIndex].image} alt={courses[selectedIndex].title}/>
            </div>
        </div>
    </div>
    )
}

export default Courses;