import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Landing from "./Landing";
import AboutMe from "./AboutMe";
import Experiences from "./Experiences";
import Projects from "./Projects";
import Courses from "./Courses";
import Contact from "./Contact";
import SideSocials from "./SideSocials";
import { useSelector } from "react-redux";

function Home(){
    const {portfolioData} = useSelector((state) => state.root);
    return (
        <div>
            <Header/>
            { portfolioData && (
                <div className="bg-primary px-20 sm:px-10">
                    <Landing/>
                    <AboutMe/>
                    <Experiences/>
                    <Projects/>
                    <Courses/>
                    <Contact/>
                    <Footer/>
                    <SideSocials/>
                </div>
            )}
        </div>
    )
}

export default Home;