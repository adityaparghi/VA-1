// import React, { useContext } from 'react'
// import { userDataContext } from '../context/UserContext'
// import { useNavigate,Navigate } from 'react-router-dom'
// import axios from 'axios'

// const Home = () => {
//   const {userData,serverUrl,setUserData} = useContext(userDataContext)
//   const navigate = useNavigate();


//   const handleLogout = async() => {  
//       try {
//         const result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials: true});
//         setUserData(null);
//         navigate('/signin');
//       } catch (error) {
//         setUserData(null);
//         console.error("Error logging out:", error);
//         navigate('/signin'); 
//       }
//   }



//   return (
//     <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] 
//     flex justify-center items-center flex-col gap-[15px] relative'>

// <button className='min-w-[150px] h-[60px] bg-blue-700 text-white rounded-4xl text-[19px] 
// mt-[5px] cursor-pointer absolute top-[20px] right-[20px] ' onClick={handleLogout} >Log Out</button>

//  <button className='min-w-[150px] h-[60px] bg-blue-700 text-white rounded-4xl text-[19px]
//  mt-[5px] cursor-pointer absolute  top-[100px] right-[20px] px-[20px] py-[10px]'
//  onClick={() => navigate('/customize')}  >Customize Assistant</button>

//         <div className='w-[350px] h-[380px] flex items-center justify-center overflow-hidden
//         rounded-4xl shadow-lg'>
//             <img src={userData?.assistantImage} alt='assistantImage' className='h-full object-cover' />
//         </div>
//         <h1 className='text-white font-semibold text-[25px]' >{userData.assistantName}</h1>
//     </div>
//   )
// }

// export default Home
import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const { userData, serverUrl, setUserData } = useContext(userDataContext)
  const navigate = useNavigate();

  const handleLogout = async () => {  
    try {
      // Call logout API
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      console.log('✅ Logout API called successfully');
    } catch (error) {
      console.log('⚠️ Logout API error (but continuing):', error.response?.data?.message);
    } finally {
      // Always clear user data and navigate, regardless of API success/failure
      setUserData(null);
      
      // Clear cookies on frontend too
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      
      console.log('✅ User data cleared, navigating to signin');
      navigate('/signin');
    }
  }

  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#02023d] 
    flex justify-center items-center flex-col gap-[15px] relative'>

      <button className='min-w-[150px] h-[60px] bg-blue-700 text-white rounded-4xl text-[19px] 
      mt-[5px] cursor-pointer absolute top-[20px] right-[20px]' onClick={handleLogout}>
        Log Out
      </button>

      <button className='min-w-[150px] h-[60px] bg-blue-700 text-white rounded-4xl text-[19px]
      mt-[5px] cursor-pointer absolute top-[100px] right-[20px] px-[20px] py-[10px]'
      onClick={() => navigate('/customize')}>
        Customize Assistant
      </button>

      <div className='w-[350px] h-[380px] flex items-center justify-center overflow-hidden
      rounded-4xl shadow-lg'>
        <img src={userData?.assistantImage} alt='assistantImage' className='h-full object-cover' />
      </div>
      <h1 className='text-white font-semibold text-[25px]'>{userData?.assistantName}</h1>
    </div>
  )
}

export default Home