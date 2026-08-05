import axiosInstance from "../utils/axiosInstance";

export const apiConnector=(method,url,bodyData,headers,params)=>{
  return axiosInstance({
    method:`${method}`,
    url:`${url}`,
    data:bodyData? bodyData:null,
    headers:headers?headers:null,
    params:params?params:null,

  })
}


// authAPI.js
//      |
//      ↓
// apiConnector.js
//      |
//      ↓
// axiosInstance.js
//      |
//      ↓
// Backend API


// Now when you call:

// apiConnector("POST", LOGIN_API, data)

// LoginForm
//     |
//     ↓
// authAPI.js
//     |
//     ↓
// apiConnector("POST", LOGIN_API, data)
//     |
//     ↓
// axiosInstance
//     |
//     ↓
// Request interceptor
//     |
//     ↓
// Adds:
// Authorization: Bearer JWT_TOKEN
//     |
//     ↓
// Backend controller





// Backend
//    |
//    ↓
// 401 Unauthorized
//    |
//    ↓
// axiosInstance response interceptor
//    |
//    ↓
// localStorage.removeItem("token")
// localStorage.removeItem("user")
//    |
//    ↓
// Navigate to /login

