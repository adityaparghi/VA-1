import React,{useContext} from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Home from './pages/Home'
import Customize1 from './pages/Customize1.jsx'

const App = () => {
  const {userData,setUserData} = useContext(userDataContext);
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName) ? <Home /> :<Navigate to={"/customize"}/>} />
      <Route path='/signup' element={!userData ? <SignUp /> :<Navigate to={"/"}/>} />
      <Route path='/signin' element={!userData ? <SignIn /> :<Navigate to={"/"}/>}  />
      <Route path = '/customize' element={userData ? <Customize /> : <Navigate to={"/signin"} />} />
      <Route path = '/customize2' element={userData ? <Customize1 /> : <Navigate to={"/signin"} />} />
      
    </Routes>
  )
}

export default App
