import React from "react";

function MovieCard({movieSearch, selectMovie}){
    const image_path = "https://image.tmdb.org/t/p/w500/";

    return (
        <div className='slideMovie' onClick={()=>selectMovie(movieSearch)}>
            <div className='imageCon'>
            <img className ='featuredImg' src={`${image_path}${movieSearch.poster_path}`}alt ="pic"/>
            </div>
        </div>
    )
}
export default MovieCard;