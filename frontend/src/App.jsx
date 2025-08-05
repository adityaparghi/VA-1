// import React,{useContext} from 'react'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import Customize from './pages/Customize.jsx'
// import { userDataContext } from './context/UserContext.jsx'
// import Home from './pages/Home'
// import Customize1 from './pages/Customize1.jsx'

// const App = () => {
//   const {userData,setUserData} = useContext(userDataContext);
//   if (userData === null) {
//     // You can show a loader here
//     return <div className="text-white p-10">Loading...</div>;
//   }
//   return (
//     <Routes>
//       <Route path='/' element={(userData?.assistantImage &&
//          userData?.assistantName) ? <Home /> :<Navigate to={"/customize"}/>} />
//       <Route path='/signup' element={!userData ? <SignUp /> :<Navigate to={"/customize"}/>} />
//       <Route path='/signin' element={!userData ? <SignIn /> :<Navigate to={"/"}/>}  />
//       <Route path = '/customize' element={userData ? <Customize /> : <Navigate to={"/signup"} />} />
//       <Route path = '/customize2' element={userData ? <Customize1 /> : <Navigate to={"/signup"} />} />
      
//     </Routes>
//   )
// }

// export default App
import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Customize from './pages/Customize.jsx'
import { userDataContext } from './context/UserContext.jsx'
import Home from './pages/Home'
import Customize1 from './pages/Customize1.jsx'

const App = () => {
  const { userData } = useContext(userDataContext);

  return (
    <Routes>
      {/* Always allow access to signin/signup */}
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      
      {/* Protected routes */}
      <Route path='/customize' element={userData ? <Customize /> : <Navigate to="/signin" />} />
      <Route path='/customize2' element={userData ? <Customize1 /> : <Navigate to="/signin" />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to="/signin" />} />
    </Routes>
  )
}

export default App