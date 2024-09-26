import React from "react";
import {Form, message} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";


function EditLanding(){
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);

    const onFinish = async (values) => {
        try{
            dispatch(ShowLoading());
            const response = await axios.post('/api/portfolio/update-landing', 
                {
                    ...values,
                    _id: portfolioData.landing._id,
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
        <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData?.landing}>
            <Form.Item name="welcomeText" label="Welcome Text">
                <input placeholder="welcomeText"/>
            </Form.Item>
            <Form.Item name="firstName" label="First Name">
                <input placeholder="firstName"/>
            </Form.Item>
            <Form.Item name="lastName" label="Last Name">
                <input placeholder="lastName"/>
            </Form.Item>
            <Form.Item name="caption" label="Caption">
                <input placeholder="caption"/>
            </Form.Item>
            <Form.Item name="description" label="Description">
                <textarea placeholder="description"/>
            </Form.Item>
            <div className="flex justify-end w-full">
                <button className="px-5 py-2 bg-primary text-light rounded-md" type="submit">SAVE</button>
            </div>
        </Form>
    )
}

export default EditLanding;