import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'


const MovieDetails = () => {
    const navigate=useNavigate();

    //fetching id from movies page
    const {id}=useParams();
    const[movie,setMovie]=useState("");
        const[isloading,setIsLoading]=useState(false);
        const [err,setErr]=useState("");
    
        //updating phase
        useEffect(()=>{
const fetchMovie=async()=>{
    try{
        let response=await axios.get(`https://cheddar-sapphire-poppyseed.glitch.me/movies/${id}`)
console.log(response.data);
setMovie(response.data)
    }catch(err){
        console.log(err)
        setErr(err)
    }
}
fetchMovie();
        }, [id])
    
        if (isloading) return <p>Loading...</p>;
        if (err) return <p>{err}</p>;
        return (
            <div className="movie-details-container">
                <h1>{movie.title}</h1>
                <img src={movie.poster} alt={movie.title} />
                <p>{movie.description}</p>
                <p>{movie.releaseDate}</p>
                <p>{movie.genre}</p>
                <button onClick={() => navigate('/movies')}>Back to Movies</button>
            </div>
        );
  
}

export default MovieDetails
