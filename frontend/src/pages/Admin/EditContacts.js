import React, { useRef } from "react";
import {Form, message, Space} from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/rootSlice";
import axios from "axios";
import useIterables from "../../components/logic/useIterables";
import { endPoint } from "../../components/logic/endPoints";

function EditContact(){
    const dispatch = useDispatch();
    const {portfolioData} = useSelector((state) => state.root);
    const {iterables: socials, setIterables: setSocials,
        AddIterable: AddSocial, removeIterable: removeSocial} = useIterables(portfolioData?.contact.socials);
    const onFinish = async (values) => {
        try{
            dispatch(ShowLoading());
            const response = await axios.post(`${endPoint}/api/portfolio/update-contact`, 
                {
                    ...values,
                    socials: socials,
                    _id: portfolioData.contact._id,
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
    const inputRef = useRef([]);

    const setInputRef = (element, index) => {
        if (element) {
            element.parentElement.classList.add('w-full');
            inputRef.current[index] = element;
        }
    };

    return (
        <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData?.contact}>
            <Form.Item name="name" label="Name">
                <input placeholder="Fill in your name"/>
            </Form.Item>
            <Form.Item name="email" label="Email">
                <input placeholder="Fill in your email"/>
            </Form.Item>
            <Form.Item name="gender" label="Gender">
                <input placeholder="Fill in your gender"/>
            </Form.Item>
            <Form.Item name="mobile" label="Mobile number">
                <input placeholder="Fill in your mobile number"/>
            </Form.Item>
            <Form.Item name="country" label="Country">
                <input placeholder="Fill in your country"/>
            </Form.Item>
            <Form.Item className=" w-full" name="socials" label="Socials">
                <Space className=" w-full" direction="vertical" gutter={8} justify="start">
                    {socials.map((social, index) => (
                        <Form.Item name="social" key={index} className="mb-2">
                            <Space className="flex w-full">
                                <input
                                    placeholder="Enter social platform"
                                    value={social.title}
                                    onChange={(event) => {
                                        const tempSocials = [...socials];
                                        tempSocials[index] = { ...tempSocials[index], title: event.target.value };
                                        setSocials(tempSocials);
                                    }}
                                />
                                <input
                                    ref={(element) => setInputRef(element, index)}
                                    className="w-full"
                                    placeholder="Enter link"
                                    value={social.link}
                                    onChange={(event) => {
                                        const tempSocials = [...socials];
                                        tempSocials[index] = { ...tempSocials[index], link: event.target.value };
                                        setSocials(tempSocials);
                                    }}
                                />
                                <span
                                    className="material-symbols-outlined cursor-pointer"
                                    onClick={() => removeSocial(index)}
                                >
                                    close
                                </span>
                            </Space>
                        </Form.Item>
                    ))}
                </Space>
            </Form.Item>
            <div className="flex justify-between w-full">
                <button className="px-5 py-2 bg-primary text-light rounded-md" type="button" onClick={() => AddSocial({ title: '', link: '' })}>Add Social</button>
                <button className="px-5 py-2 bg-primary text-light rounded-md" type="submit">SAVE</button>
            </div>
        </Form>
    )
}

export default EditContact;