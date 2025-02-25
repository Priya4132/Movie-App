import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContextProvider';
import "../styles/Login.css";

const Login = () => {
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const[error,setError]=useState(null)
    // const[token,setToken]=useState(null);
    //using context to fetch login function from context provider
    const{login}=useContext(AuthContext);
    //login function
    const handleLogin= async(e)=>{
e.preventDefault();

try{
    let response= await axios({
        url:"https://cheddar-sapphire-poppyseed.glitch.me/login",
        method:"POST",
        data:{
            username,password
        }
    })

   
    //console.log(respone)
    if(response.data.success){
        console.log(response.data.token,"token")
   const {token}=response.data;//get token from backend then object destructuring
 //  setToken(token);//setting the token
 login(token);//sending back the token
    }


}catch(err){
setError(err.response.data.message);
// console.log(err.message)
}

    }
  return (
   <>
   <div className="login-container">
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<input
					type="password"
					placeholder="Enter Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<input type="submit" value="Login" />
			</form>
			{error && <p style={{ color: "red" }}>{error}</p>}
		</div>
   </>
  )
}

export default Login
