import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {Modal, Form, Space, message} from "antd";
import { HideLoading, ReloadData, ShowLoading } from "../../redux/rootSlice";
import axios from "axios";
import { endPoint } from "../../components/logic/endPoints";

function EditExperience() {
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {experiences} = portfolioData;
    const [showModal, setShowModal] = React.useState(false);
    const [selectedExperience, setSelectedExperience] = React.useState(null);
    const [type, setType] = React.useState("add");
    const onFinish = async (values) => {
        try {
            dispatch(ShowLoading());
            let response
            if(selectedExperience){
                response = await axios.post(`${endPoint}/api/portfolio/update-experience`,{
                    ...values,
                    _id: selectedExperience._id
                });
            }else{
                response= await axios.post(`${endPoint}/api/portfolio/add-experience,values`);
            }
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                setShowModal(false);
                setSelectedExperience(null);
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
            const response = await axios.post(`${endPoint}/api/portfolio/delete-experience`,{
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
                    setSelectedExperience(null);
                    setType("add");
                }}>
                    Add Experience
                </button>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-5">
                {experiences.map((experience) => (
                    <div key={experience._id} className="flex flex-col shadow-md border border-tertiary rounded-md p-2">
                        <h1 className="text-xl sm:text-md font-bold text-secondary">{experience.startMonth}/{experience.startYear} - {experience.endMonth}/{experience.endYear}</h1>
                        <hr className="border-gray-500 rounded"/>
                        <h1>Team {experience.team} - {experience.entity}</h1>
                        <h1>{experience.title}</h1>
                        <p className="h-full text-justify py-2">{experience.description}</p>
                        <div className="flex self-end justify-end gap-5 items-center">
                            <button 
                            className="bg-secondary text-white py-1 px-5 rounded-md 
                            hover:ring ring-offset-light ring-offset-2 ring-secondary duration-200"
                            onClick={()=>{
                                onDelete(experience);
                            }}>
                                Delete
                            </button>
                            <button 
                            className="bg-primary text-white py-1 px-5 rounded-md 
                            hover:ring ring-offset-light ring-offset-2 ring-primary duration-200"
                            onClick={() => {
                                setSelectedExperience(experience);
                                setShowModal(true)
                                setType("edit");
                            }}>
                                Edit
                            </button>
                            
                        </div>
                    </div>
                ))}
            </div>
            {
            (type === "add" || selectedExperience) && 
            (<Modal 
            open={showModal}
            title={selectedExperience ? "Edit Experience" : "Add Experience"}
            footer={null}
            onCancel={() => {
            setShowModal(false)
            setSelectedExperience(null);
            }}
            >
                <Form layout="vertical" 
                onFinish={onFinish}
                initialValues={selectedExperience}
                >
                    <Form.Item name="period" label="Period">
                        <Space.Compact className="flex items-center -mb-6">
                            <Form.Item name="startMonth">
                                <input placeholder="Start Month"/>
                            </Form.Item>
                            <Form.Item name="startYear">
                            <input placeholder="Start Year"/>
                            </Form.Item>
                            <span className="mb-6"> - </span>
                            <Form.Item name="endMonth">
                            <input placeholder="End Month"/>
                            </Form.Item>
                            <Form.Item name="endYear">
                            <input placeholder="End Year"/>
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item name="entity" label="Entity">
                        <input placeholder="Entity"/>
                    </Form.Item>
                    <Form.Item name="team" label="Team">
                        <input placeholder="Team"/>
                    </Form.Item>
                    <Form.Item name="title" label="Title">
                        <input placeholder="Title"/>
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <textarea placeholder="Description"/>
                    </Form.Item>
                    <div className="flex justify-end gap-5">
                    <button className="border-primary text-primary px-5 py-2"
                    onClick={() => {
                        setShowModal(false);
                        setSelectedExperience(null);
                    }}
                    type="button"
                    >Cancel</button>
                    <button className="bg-primary text-white px-5 py-2"type="submit">{selectedExperience? "Save" : "Add"}</button>
                    </div>
                </Form>
            </Modal>)
            }
            
        </div>
    )
}

export default EditExperience;