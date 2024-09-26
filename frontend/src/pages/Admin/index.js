import React, { useEffect } from "react";
import Header from "../../components/Header";
import EditLanding from "./EditLanding";
import EditAbout from "./EditAbout";
import EditExperience from "./EditExperience";
import EditProjects from "./EditProjects";
import EditCourses from "./EditCourse";
import EditContact from "./EditContacts";
import {Tabs} from 'antd';
import { useSelector } from "react-redux";
import SectionTitle from "../../components/SectionTitle";

function Admin(){
    const {portfolioData} = useSelector((state) => state.root);
    const tabs = [
        {tab: "Landing",    key: "1",   content: <EditLanding/>},
        {tab: "About",      key: "2",   content: <EditAbout/>},
        {tab: "Experience", key: "3",   content: <EditExperience/>},
        {tab: "Projects",   key: "4",   content: <EditProjects/>},
        {tab: "Courses",    key: "5",   content: <EditCourses/>},
        {tab: "Contact",    key: "6",   content: <EditContact/>},
    ]

    useEffect(() =>{
        if(!localStorage.getItem('token')){
            window.location.href = '/admin-login';
        }
    },[])

    const logout = () => {
        delete localStorage.token;
        window.location.href = '/admin-login';
    }
    return (
        <div className="bg-light">
            <Header/>
            <div className="flex px-5 justify-between">
                <SectionTitle title="Portfolio Editor" textColor="dark" lineColor="primary"/> 
                <button 
                className="bg-primary rounded-md p-2 m-1 text-light cursor-pointer
                hover:ring-2 ring-offset-1 hover:bg-secondary ring-secondary duration-200"
                onClick={logout}>Logout</button>     
            </div>      
            { portfolioData && (
            <Tabs 
            className="p-5" 
            defaultActiveKey="1"
            type="card"
            items={
                tabs.map(tab =>{
                    return {
                        label: tab.tab,
                        key: tab.key,
                        children: tab.content
                    }
                })
            }/>
                )}
        </div>
    )
}

export default Admin;