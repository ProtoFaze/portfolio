import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Modal, Form, message, Row} from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import useIterables from "../../components/logic/useIterables";
import axios from "axios";

function EditCourses() {
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {courses} = portfolioData;
    const [showModal, setShowModal] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const {iterables: skills, setIterables: setSkills,
         AddIterable: AddSkill, removeIterable: removeSkill} = useIterables(selectedCourse?.skills);
    const [type, setType] = useState("add");
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response
            if(selectedCourse){
                response = await axios.post('/api/portfolio/update-course',{
                    ...values,
                    skills: skills,
                    _id: selectedCourse._id
                });
            }else{
                response= await axios.post('/api/portfolio/add-course',values);
            }
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                setShowModal(false);
                setSelectedCourse(null);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            }else{
                message.error(response.data.message);
            }
        }catch(err){
            dispatch(HideLoading());
            console.log(err);
        }
    }
    const onDelete = async (item) =>{
        try{
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/delete-course',{
                _id: item._id
            });
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            }else{
                message.error(response.data.message);
            }
        }catch(err){
            dispatch(HideLoading());
            console.log(err);
        }
    }

    return (
        <div>
            <div className="flex justify-end py-2">
                <button 
                className="bg-primary text-white py-1 px-5 rounded-md 
                hover:ring ring-offset-light ring-offset-2 ring-primary duration-200"
                onClick={() => {
                    setShowModal(true);
                    setSelectedCourse(null);
                    setType("add");
                }}>
                    Add Course
                </button>
            </div>
            <div className="flex flex-wrap flex-row justify-start sm:justify-center gap-5">
                {courses.map((course) => (
                    <div key = {course._id} className="flex flex-col w-96 shadow-md border border-tertiary rounded-md p-2 gap-5">
                        <h1 className="text-2xl h-[64px] sm:text-md flex-shrink-0 font-bold text-primary">{course.title}</h1>
                        <hr className="border-gray-500 rounded"/>
                        <div className="flex flex-shrink-0 h-80 w-full items-center justify-center">
                            {course.image.includes("figma") ? 
                                <iframe title="Figma design" className="flex justify-center h-80 w-full" src={course.image} allowFullScreen></iframe> :
                                <img className="h-full rounded-md object-contain" src={course.image} alt={course.title}/>
                            }
                        </div>                     
                        <p className="h-full text-justify py-2">{course.description}</p>
                        <div className="flex self-end justify-end gap-5 items-center">
                            <button 
                            className="bg-secondary text-white py-1 px-5 rounded-md 
                            hover:ring ring-offset-light ring-offset-2 ring-secondary duration-200"
                            onClick={()=>{
                                onDelete(course);
                            }}>
                                Delete
                            </button>
                            <button 
                            className="bg-primary text-white py-1 px-5 rounded-md 
                            hover:ring ring-offset-light ring-offset-2 ring-primary duration-200"
                            onClick={() => {
                                setSelectedCourse(course);
                                setShowModal(true)
                                setType("edit");
                                console.log(course._id);
                            }}>
                                Edit
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
            {
            (type === "add" ||
            selectedCourse) && (<Modal 
            open={showModal}
            title={selectedCourse ? "Edit Course" : "Add Course"}
            footer={null}
            onCancel={() => {
            setShowModal(false)
            setSelectedCourse(null);
            }}
            >
                <Form layout="vertical" 
                onFinish={onFinish}
                initialValues={selectedCourse || {}}>
                    <Form.Item name="image" label="Image Link">
                        <input placeholder="Insert link for image"/>
                    </Form.Item>
                    <Form.Item name="link" label="Course Link">
                        <input placeholder="Insert link for course"/>
                    </Form.Item>
                    <Form.Item name="title" label="Title">
                        <input placeholder="Title"/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <textarea placeholder="Description"/>
                    </Form.Item>
                    <Form.Item name="skills" label="Skills">
                        <Row gutter={8} justify="start">
                            {skills.map((skill, index) => (
                                <Form.Item name="skill" key={index} className="mb-2 mx-1 relative flex-grow">
                                    <input
                                        placeholder="Enter skill"
                                        value={skill}
                                        onChange={(event) => {
                                            const tempSkills = [...skills];
                                            tempSkills[index] = event.target.value;
                                            setSkills(tempSkills);
                                        }}
                                    />
                                    <span
                                        className="material-symbols-outlined cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2"
                                        onClick={() => removeSkill(index)}
                                    >
                                        close
                                    </span>
                                </Form.Item>
                            ))}
                        </Row>
                    </Form.Item>
                    <div className="flex justify-between gap-5">
                        <button className="px-5 py-2 bg-primary text-light rounded-md hover:ring ring-offset-light ring-offset-2 ring-primary duration-200" 
                        onClick={() => AddSkill('')} 
                        type="button">
                            AddSkill
                        </button>
                        <button className="border-primary text-primary px-5 py-2"
                        onClick={() => { setShowModal(false); setSelectedCourse(null);}}
                        type="button">
                            Cancel
                        </button>
                        <button className="bg-primary text-white px-5 py-2"
                        type="submit">
                            {selectedCourse ? "Save" : "Add"}
                        </button>
                    </div>
                </Form>
            </Modal>)
            }
            
        </div>
    )
}

export default EditCourses;