import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({children}) => {
    const location=useLocation();
    const {isAuthenticated}=useContext(AuthContext);

    useEffect(()=>{
        console.log(location)
    },[location])
  if(!isAuthenticated){//if not loggeed then go to login otherwise go to children that is home or movies
return <Navigate to="/login"  state={{from:location}}/>
  }
  return children
  {/* //or you can use this */}

//   {isAuthenticated}? children:<Navigate to="/login"></Navigate>

}

export default PrivateRoute
