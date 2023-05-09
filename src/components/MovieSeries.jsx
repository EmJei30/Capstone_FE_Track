import React from "react";

function MovieSeries({movieSeries, selectMovie}){
    const image_path = "https://image.tmdb.org/t/p/w500/";

    return (
        <div className='slideHome' onClick={()=>selectMovie(movieSeries)}>
            <div className='imageCon'>
            <img className ='featuredImg' src={`${image_path}${movieSeries.poster_path}`}alt ="pic"/>
            </div>
        </div>
    )
}
export default MovieSeries;