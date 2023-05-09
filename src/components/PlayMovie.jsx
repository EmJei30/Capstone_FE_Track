import React, {useState, useEffect}from "react";
import '../stylesheets/PlayMovie.css';
import Nav_bar_2 from '../components/Nav_bar_2';
import { useLocation } from "react-router-dom";
import Youtube from 'react-youtube';
import { Link} from 'react-router-dom';

function PlayMovie(){
    const location = useLocation();
    const movie = location.state.data;
    const [trailer, setTrailer] = useState(false);
    const release = movie.release_date.split("-");
    let year = release[0];
    const [user, setUser] = useState('');
    const image_path = "https://image.tmdb.org/t/p/original/";

    useEffect(()=>{
        let name = sessionStorage.getItem('name');
        if(name === "" || name === null){
            // usenavigate('/SignIn');
        }else{
            setUser(name);
        }console.log(user); 
    });

    /*-----to render the selected movie------- */
    const renderMovie = () =>{
        const trailer = movie.videos.results.find(vid => vid.name === 'Official Trailer'||
        vid.name === 'Official Trailer 1' || vid.name === 'Trailer');

        return(
            <Youtube 
                videoId = {trailer.key}
                className = {"movie-container"}
                opts={{
                    width : "100%",
                    height: "100%",
                    playerVars: {
                        autoplay: 1,
                        controls: 0
                    }
                }}
            />
        )
     }
     console.log(user);
    return (
        <div className="playMovieContainer">
            {user ?
            <div className="movieSearchedContainer">
              {movie.videos ? renderMovie() : null}
            </div>
            :
            <div className="movieSearchedContainer">
                <div>
                    <img className ='movieImage' src={`${image_path}${movie.backdrop_path}`}alt ="pic"/>
                </div>
                <div className="overLayText">
                    <div><p>This video is only available to HBO GO subscribers.</p></div>
                    <div><Link to ="/signin"  className="p1"><p>Sign into HBO GO</p></Link></div> 
                    <div><p>Don't have HBO GO?</p></div>
                    <div><Link to ="/signup"  className="p2"><p>Click here to find out how to subscribe</p></Link></div>
                </div>
            </div>
            }
            <div className="descriptionContainer">
                <div className="movieTitle">
                    {movie.title}
                </div>
                <div className="dateReleased">
                        {year} | PG | {movie.runtime}M | HD
                </div>
                <div className="description">
                {movie.overview}
                </div>
            </div>
        
        <Nav_bar_2 user = {user}/>
        </div>
    )
}
export default PlayMovie;