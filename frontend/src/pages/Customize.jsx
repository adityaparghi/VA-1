import React, { useContext, useRef, useState } from 'react'
import Card from '../components/card'
import image1 from '../assets/authBg.png'
import image2 from '../assets/img2.jpg'
import image3 from '../assets/img3.jpg'
import image4 from '../assets/img5.jpg'
import image5 from '../assets/img6.jpg'
import image6 from '../assets/img7.jpg'
import image7 from '../assets/img8.png'
import image8 from '../assets/img9.jpg'
import image9 from '../assets/img10.jpg'
import { RiImageAiFill } from "react-icons/ri";
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'


const Customize = () => {
  
  const { serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage,
    setFrontendImage, selectedImage, setSelectedImage} = useContext(userDataContext)
  
    const navigate = useNavigate();


  const inputImage = useRef();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  }
  return (
    <div className='w-full h-[100vh] bg-gradient-to-t from-black to-[#030353] 
    flex justify-center items-center flex-col p-[20px]'>
      <h1 className='text-white mb-[40px] text-[25px] text-center' >Select Your <span
        className='text-blue-300'>Assistant Image</span> </h1>
      <div className='w-full max-w-[60%] flex justify-center items-center flex-wrap gap-[15px]'>
        <Card image={image3} />
        <Card image={image1} />
        <Card image={image2} />
        <Card image={image4} />
        <Card image={image6} />
        <Card image={image7} />
        <Card image={image9} />

        <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[170px] bg-[#030326] border-2 border-[#0000ff66] rounded-2xl overflow-hidden
          hover:shadow-2xl hover:shadow-blue-950 
          cursor-pointer hover:border-4 hover:border-white  flex items-center justify-center
          $${selectedImage == "input" ? 'border-4 border-white shadow-2xl shadow-blue-950' : null}`}
          onClick={() => {
          inputImage.current.click()
          setSelectedImage("input")
          }}>
         {!frontendImage &&  <RiImageAiFill className='text-white h-[30px] w-[30px]' /> }
         {frontendImage && <img src={frontendImage} className='h-full object-cover' />}
        </div>
        
        <input type='file' accept='image/*' ref={inputImage} hidden onClick={handleImage} ></input>
      </div>
          {selectedImage && <button className='min-w-[150px] h-[60px] mt-[30px] bg-blue-700 text-white rounded-4xl 
          text-[22px] tracking-tighter: letter-spacing: -0.05em cursor-pointer' onClick={() => navigate('/customize2')}>Next</button> }
      
    </div>
  )
}

export default Customize
