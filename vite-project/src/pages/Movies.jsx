import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import axios from 'axios'
import "../styles/Movies.css";
import { useNavigate } from 'react-router-dom';

const Movies = () => {
    const[movies,setMovies]=useState([]);
    const[isloading,setIsLoading]=useState(false);
    const[error,setError]=useState(null);

    const [page,setPage]=useState(1);//intial page 1
    const[limit]=useState(5);//5 items per page
    const[totalPages,setTotalPages]=useState(1);
    const [sortOption, setSortOption] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState(() => {
        // Retrieve favorites from localStorage or initialize as an empty array
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
      });
    //state for managing genre filter
const[genre,setGenre]=useState("");//intiall All
    const navigate=useNavigate();
    //mounting phase
    useEffect(()=>{
        setIsLoading(true);
     const fetchMovies=async ()=>{
try{
    const response=await axios.get(`https://cheddar-sapphire-poppyseed.glitch.me/movies?genre=${genre}&page=${page}&limit=${limit}&search=${searchQuery}`)
    console.log(response.data.movies)
    // setMovies(response.data.movies);
    const {movies,currentPage,totalPages}=response.data;
    setMovies(movies);
    setPage(currentPage);
    setTotalPages(totalPages);
    
    setIsLoading(false);

}catch(err){
setError(err.response.data.message);
setIsLoading(false);
}
     }
     fetchMovies();
    },[genre,page,searchQuery])
  
   
   
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

//sorting

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
//sorting 
const handleSort = (e) => {
    setSortOption(e.target.value);
  };
  const filteredMovies = movies
  .filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery) ||
      movie.genre.toLowerCase().includes(searchQuery)
  )
  .sort((a, b) => {
    if (sortOption === 'releaseDate') {
      return new Date(b.releaseDate) - new Date(a.releaseDate);
    } else if (sortOption === 'rating') {
      return b.rating - a.rating;
    } else {
      return 0;
    }
  });

  //favoruite movie
  const toggleFavorite = (id) => {
    let updatedFavorites;
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter((favId) => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (

    
<div className='movie-container'>
    <h1>Movie Explorer</h1>
  
    {/* search bar */}
    <input
          type="text"
          placeholder="Search by title or genre"
          value={searchQuery}
          onChange={(e)=> setSearchQuery(e.target.value.toLowerCase())}
        />
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
{/* sorting  */}
<select name="sort" value={sortOption} onChange={handleSort}>
          <option value="">Sort By</option>
          <option value="releaseDate">Release Date</option>
          <option value="rating">Rating</option>
        </select>


     



    <div className="movies-list">
				{filteredMovies.map((movie) => (
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
                            <button
                className={`favorite-btn ${favorites.includes(movie.id) ? 'favorited' : ''}`}
                onClick={() => toggleFavorite(movie.id)}
              >
                {favorites.includes(movie.id) ? 'Unfavorite' : 'Favorite'}
              </button>
                            </div>
                            </div>
                        ))}
                        
                        </div>

                        {/* paginantion */}
                        <button disabled={page==1} onClick={handlePrev}>Prev</button> page{page}of {totalPages}
                        <button disabled={page==totalPages} onClick={handleNext}>Next</button>
                        </div>
                        

)
}

export default Movies
