import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import "../styles/Movies.css";
import { useNavigate } from 'react-router-dom';
import  InfinitScroll from 'react-infinite-scroll-component'

const MovieScroller = () => {
    const[movies,setMovies]=useState([]);
    const[isloading,setIsLoading]=useState(false);
    const[error,setError]=useState(null);

    const [page,setPage]=useState(1);//intial page 1
    const[limit]=useState(5);//5 items per page
   const[hasMore,setHasMore]=useState(true)
    //state for managing genre filter
const[genre,setGenre]=useState("");//intiall All
    const navigate=useNavigate();
    //mounting phase
    useEffect(()=>{
        setIsLoading(true);
     const fetchMovies=async ()=>{
try{
    const response=await axios.get(`https://cheddar-sapphire-poppyseed.glitch.me/movies?genre=${genre}&page=${page}&limit=${limit}`)
    console.log(response.data.movies)
    // setMovies(response.data.movies);
    // const {movies,currentPage,totalPages}=response.data;
    setMovies(movies);
    
    // setTotalPages(totalPages);
    if(response.data.movies.length==0){
        setHasMore(false);
    }
    {
setMovies([...movies,...response.data.movies])
    }
    
    setPage(response.data.currentPage);
    
    setIsLoading(false);

}catch(err){
setError(err.response.data.message);
setIsLoading(false);
}
     }
     fetchMovies();
    },[genre,page])
   if (isloading)<p>Loading Movies...</p>
   if(error)<p>{error}</p>
   
   
   //dynamic routing for each movie 
   const handleViewMore=(id)=>{
    navigate(`/movies/${id}`);
   }

   //delete movie button

const handleDelete=async(id)=>{
    try{
        const response= await axios.delete(`https://cheddar-sapphire-poppyseed.glitch.me/movies/${id}`)

        setMovies(movies.filter((movie)=>movie.id!=id));//realoading the page after deleting the movie
        alert("movie deleted successfully ")


    }catch{
        alert("Failed to delete the movie")
    }
}
//prev button
const handlePrev=()=>{
    if(page>1){
        setPage((prev)=>prev-1);
    }
}
const handleNext=()=>{
    // console.log("priya")
    if(page <totalPages){
        setPage((prev)=>prev +1);
    }
}

  return (
    
<div className='movie-container'>
    <h1>Movie Explorer</h1>
    <button className="add-movie-btn" onClick={()=>navigate("/add-movie")}>
				Add Movie
			</button>
{/* genre filter */}
<select name="genre" value={genre} onChange={(e)=>setGenre(e.target.value)}>
<option value="">All</option>
					<option value="Action">Action</option>
					<option value="Crime">Crime</option>{" "}
					<option value="Drama">Drama</option>
					<option value="Sci-Fi">Sci-Fi</option>
</select>


<InfinitScroll dataLength={movies.length} //This is important field to render the next data
  next={()=>setPage(prev=>prev+1)}
  hasMore={hasMore}
  loader={<h4>Loading more movies...</h4>}
  endMessage={
    <p style={{ textAlign: 'center' }}>
      <b>Yay! You have seen it all</b>
    </p>}>
    <div className="movies-list">
				{movies.map((movie) => (
					<div key={movie.data} className="movie-card">
						<img src={movie.poster} alt={movie.name} className="movie-poster" />
						<h3 className="movie-title">{movie.title}</h3>
						<h3>Genre : {movie.genre}</h3>
						<p>Release Date : {movie.releaseDate}</p>
                        <div className="movie-actions">
							<button
								className="edit-btn"
							onClick={()=> navigate(`/edit-movie/${movie.id}`)}	
							>
								Edit
							</button>
							<button
								className="delete-btn"
								onClick={()=>handleDelete(movie.id)}
							>
								Delete
							</button>
							<button
								className="view-more-btn"
								onClick={()=>handleViewMore(movie.id)}
							>
								View more..
							</button>
                            </div>
                            </div>
                        ))}
                        
                        </div>
                        </InfinitScroll>

                        {/* paginantion
                        <button disabled={page==1} onClick={handlePrev}>Prev</button> page{page}of {totalPages}
                        <button disabled={page==totalPages} onClick={handleNext}>Next</button> */}
                        </div>
                        

)
}

export default MovieScroller
