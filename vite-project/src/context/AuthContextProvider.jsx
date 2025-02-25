import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';


//step-1 create a context
export const AuthContext=createContext();
const AuthContextProvider = ({children}) => {//here children is App.jsx
    const[isAuthenticated,setIsAuthenticated]=useState(()=>{
    return localStorage.getItem("token")?true:false
    });
    const[token,setToken]=useState(null);
    const navigate=useNavigate();
    const location=useLocation();


    //updating phase
    useEffect(()=>{
console.log(token)
    },[token])

    //login function
    const login=(authToken)=>{
        setIsAuthenticated(true);
        setToken(authToken);
        navigate(location.state.from || "/");
        //once login save the credentials to localstorage
        localStorage.setItem("token", authToken);
        //set authentication to true
        //set the token
        //navigate to home page

    }
    const logout=()=>{
       
        setToken(null);
        setIsAuthenticated(false);
        navigate("/login");
        //once logout remove the credentials from local storage
        localStorage.removeItem("token")
      //set authentication to false
        //set the token as null
        //navigate user to login page
    }
  return (
   <AuthContext.Provider value={{isAuthenticated,token,login,logout}}>
    {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
