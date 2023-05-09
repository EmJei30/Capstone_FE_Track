import React, {useEffect, useState} from "react";
import Axios from "axios";
import play2 from '../assets/images/play2.png'
import '../stylesheets/TrendingMovies.css';

function TrendingNow({mov}){
    const [selectedTrendingMovie, setSelectedTrendingMovie] = useState('');

    const url = "https://api.themoviedb.org/3";
    const image_path = "https://image.tmdb.org/t/p/w780/";

    /**fetch single movie data from api */ 
    const fetchMovie = async (id) =>{
        const {data} = await Axios.get(`${url}/movie/${id}`,{
            params: {
                api_key: '79350a2160a81306468e03a81e4ca934',
                append_to_response: 'videos'
                }
        })
        return data;
    }
    const selectMovie = async (mov) =>{
        const data = await fetchMovie(mov.id);
        setSelectedTrendingMovie(data);
    }

    return (
        <div className="trending">      
            <div className="listItem" onClick={()=>selectMovie(mov)}>
                <div className="holder">
                    <img className ='trendingImage' src={`${image_path}${mov.backdrop_path}`}alt ="pic"/>
                    <p>{mov.title}</p>
                </div>
                <div className='over-lay'>
                   <img src ={play2} alt ="pic" className='overlay-img'/>
                </div>
            </div>     
        </div>
    )
}
export default TrendingNow;