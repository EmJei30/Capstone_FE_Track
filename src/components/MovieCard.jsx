import React from "react";

function MovieCard({movie, selectMovie}){
    const image_path = "https://image.tmdb.org/t/p/w500/";

    return (
        <div className='slideHome' onClick={()=>selectMovie(movie)}>
            <div className='imageCon'>
            <img className ='featuredImg' src={`${image_path}${movie.poster_path}`}alt ="pic"/>
            </div>
        </div>
    )
}
export default MovieCard;