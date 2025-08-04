import React, { useContext, useState } from 'react';
import bg from '../assets/chatgpt.png';
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext.jsx';
import axios from 'axios';

function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const {serverUrl, userData,setUserData} = useContext(userDataContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignIn = async (e) => {
        e.preventDefault();
        setErr(""); 
        setLoading(true);
        try {
            let result = await axios.post(`${serverUrl}/api/auth/signin`,{email,password},
            {withCredentials: true});
            console.log(result);
            setUserData(result.data);
            setLoading(false);
            navigate('/');
        } catch (error) {
            console.log(error);
            setUserData(null);
            setLoading(false);
            setErr(error.response.data.message)
        }
    }

    return (
        <div className='w-full h-[100vh] bg-cover flex justify-start items-center py-4 px-20'
            style={{ backgroundImage: `url(${bg})` }}>
            <form className='w-[90%] h-[500px] max-w-[500px] bg-blue-900/50 backdrop-blur shadow-lg shadow-black
        flex flex-col justify-center items-center gap-[20px] px-6' onSubmit={handleSignIn}>

                <h1 className='text-white font-semibold text-[30px] mb-[30px]'>Sign In to
                    <span className='text-blue-200'> Virtual Assistant</span> </h1>

                <input type='email' placeholder='Email' className='w-full h-[60px] text-white text-[18px] border-white
                border-1 outline-none bg-transparent placeholder-gray-400 rounded-4xl px-[25px] py-[10px]'
                 required onChange={(e) => setEmail(e.target.value)} value={email}></input>

                <div className='w-full h-[60px] text-[18px] border-white border-1 outline-none bg-transparent
                 placeholder-gray-400 rounded-4xl relative '>
                    <input type={showPassword ? '1' : 'password'} placeholder='Password' className='w-full h-full bg-transparent rounded-4xl outline-none placeholder-gray-400
                    px-[25px] py-[10px] text-white'
                    required onChange={(e) => setPassword(e.target.value)} value={password} />
                    {!showPassword && <ImEye className='absolute w-[25px] h-[25px] text-white top-[18px] right-[20px] cursor-pointer' onClick={() => setShowPassword(true)} />}
                    {showPassword && <ImEyeBlocked  className='absolute w-[25px] h-[25px] text-white top-[18px] right-[20px] cursor-pointer' onClick={() => setShowPassword(false)} />}    
                </div>

                {err && <p className='text-red-500 text-[16px] font-semibold'>{err}</p>}
                
                <button className='min-w-[150px] h-[60px] bg-blue-700 text-white rounded-4xl text-[19px] mt-[5px]' disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>

                <p className='text-white cursor-pointer text-[17px]' onClick={() => navigate('/signup')}>Want to create a new account ? <span
                className='text-blue-400' >Sign Up</span></p>
 
            </form>
        </div>
    )
}

export default SignIn
