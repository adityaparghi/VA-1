import React, {  useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'


const Customize1 = () => {
    const {userData} = useContext(userDataContext)
    const [assistantName, setAssistantName] = useState(userData?.assistantName || '');
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] 
    flex justify-center items-center flex-col p-[20px]'>
        <h1 className='text-white mb-[40px] text-[25px] text-center' >Enter Your <span
        className='text-blue-300'>Assistant Name</span> </h1>
         <input type='text' placeholder='eg. Jarvis' className='w-full max-w-[600px] h-[60px] text-white text-[18px] border-white
        border-1 outline-none bg-transparent placeholder-gray-400 rounded-4xl px-[25px] py-[10px]' required
        onChange={(e) => setAssistantName(e.target.value)} value={assistantName}
        />
        {assistantName && 
        <button className='min-w-[230px] h-[60px] mt-[30px] bg-blue-700 text-white rounded-4xl 
        text-[22px] tracking-tighter: letter-spacing: -0.05em cursor-pointer'>Create assistant</button>}
        
      
    </div>
  )
}

export default Customize1
