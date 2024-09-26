import React from "react";
import {Form, message, Row } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import useIterables from "../../components/logic/useIterables";
import axios from "axios";


function EditAbout(){
    //handlers and states
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {iterables: skills, setIterables: setSkills,
        AddIterable: AddSkill, removeIterable: removeSkill} = useIterables(portfolioData?.about.skills);


    //POST to update about
    const onFinish = async (values) => {
        try{
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/update-about', 
                {
                    ...values,
                    skills: skills,
                    _id: portfolioData.about._id,
                });
                dispatch(HideLoading());
                if(response.data.success){
                    message.success(response.data.message);
                }else{
                    message.error(response.data.message);
                }
        }catch(err){
            dispatch(HideLoading());
            console.log(err);
        }
    }

    return (
        <Form onFinish={onFinish} layout="vertical"
         initialValues={portfolioData?.about}>
            <Form.Item name="lottieURL" label="Lottie URL">
                <input placeholder="lottieURL"/>
            </Form.Item>
            <Form.Item name="description1" label="Description 1">
                <textarea placeholder="Enter the first paragraph of your description"/>
            </Form.Item>
            <Form.Item name="description2" label="Description 2">
                <textarea placeholder="Enter the second paragraph of your description"/>
            </Form.Item>
            <div className="my-2">Skills</div>
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
            <div className="flex justify-between">
                <button className="px-5 py-2 bg-primary text-light rounded-md hover:ring ring-offset-light ring-offset-2 ring-primary duration-200" onClick={() => AddSkill('')} type="button">AddSkill</button>
                <button className="px-5 py-2 bg-primary text-light rounded-md hover:ring ring-offset-light ring-offset-2 ring-primary duration-200" type="submit">SAVE</button>
            </div>
        </Form>
    )
}

export default EditAbout;
