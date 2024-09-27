import { message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { HideLoading, ShowLoading } from "../../redux/rootSlice";
import { useDispatch } from "react-redux";
import { endPoint } from "../../components/logic/endPoints";

function Login() {
    const [user, setUser] = React.useState({
        username: "",
        password: ""
    });


    const dispatch = useDispatch();
    const login = async () => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(`${endPoint}/api/portfolio/admin-login`, user);
            dispatch(HideLoading());
            if(response.data.success){
                message.success(response.data.message);
                localStorage.setItem('token', JSON.stringify(response.data));
                window.location.href = '/admin';
            }else{
                alert(response.data.message);
            }
        }catch(err){
            dispatch(HideLoading());
            message.error(err.message);
        }
    }

    const [isPrimary, setIsPrimary] = useState(true);
    useEffect(() => {
        const interval = setInterval(() => {
            setIsPrimary(prevIsPrimary => !prevIsPrimary);
        }, 3000); // Change color every 3 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);
    return (
        <div className="bg-gradient-to-br w-full h-screen from-primary to-tertiary flex items-center justify-center">
            <div className={`flex flex-col items-center justify-center border border-dark rounded-md ${isPrimary ? 'bg-primary' : 'bg-tertiary'} gap-10 p-16 shadow-lg transition-colors duration-1000`}>
                <h1 className={`text-3xl ${isPrimary ? 'text-light' : 'text-dark'} transition-colors duration-1000`}>Login</h1>
                <hr className={`${isPrimary ? 'border-light' : 'border-dark'} border-x-2 w-full transition-colors duration-1000`}/>
                <input type="text" placeholder="Username" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} />
                <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} />
                <button className="bg-secondary text-white py-1 px-5 rounded-md hover:ring ring-offset-light ring-offset-2 ring-secondary duration-200"
                onClick={login}
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login;