// import axios from 'axios'
// import React, { createContext, useEffect, useState } from 'react'

// export const userDataContext = createContext()

// const UserContext = ({ children }) => {
//     const serverUrl = "http://localhost:8000"
//     const [userData, setUserData] = useState(null)
//     const [frontendImage, setFrontendImage] = useState(null);
//     const [backendImage, setBackendImage] = useState(null);
//     const [selectedImage, setSelectedImage] = useState(null)

//     const handleCurrentUser = async () => {
//         try {
//             const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
//             setUserData(result.data)
//             console.log(result.data)
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     useEffect(() => {
//         handleCurrentUser()
//     }, [])


//     const value = {
//         serverUrl, userData, setUserData, backendImage, setBackendImage, frontendImage,
//         setFrontendImage, selectedImage, setSelectedImage
//     }

//     return (
//         <userDataContext.Provider value={value}>
//             {children}
//         </userDataContext.Provider>
//     )
// }

// export default UserContext

import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const userDataContext = createContext()

const UserContext = ({ children }) => {
    const serverUrl = "http://localhost:8000"
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [frontendImage, setFrontendImage] = useState(null);
    const [backendImage, setBackendImage] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null)

    const handleCurrentUser = async () => {
        try {
            setLoading(true)
            const result = await axios.get(`${serverUrl}/api/user/current`, { withCredentials: true })
            setUserData(result.data)
            console.log('✅ User authenticated:', result.data)
        } catch (error) {
            // This is NORMAL when user is not logged in - don't treat as error
            console.log('👤 User not authenticated (normal for signin page)')
            setUserData(null)
        } finally {
            setLoading(false) // Always stop loading
        }
    }

    useEffect(() => {
        handleCurrentUser()
    }, [])

    // Only show loading for a brief moment, then always show content
    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'linear-gradient(to top, black, #030353)',
                color: 'white',
                fontSize: '18px'
            }}>
                Loading...
            </div>
        )
    }

    const value = {
        serverUrl, 
        userData, 
        setUserData, 
        backendImage, 
        setBackendImage, 
        frontendImage,
        setFrontendImage, 
        selectedImage, 
        setSelectedImage,
        handleCurrentUser // Add this so we can refresh user data
    }

    return (
        <userDataContext.Provider value={value}>
            {children}
        </userDataContext.Provider>
    )
}

export default UserContext