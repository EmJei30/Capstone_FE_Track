import '../stylesheets/Movies.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import MoviesComponent from '../components/MoviesComponent';
import Youtube from 'react-youtube';
import PopularMovies from '../components/PopularMovies';
import TopRatedMovies from '../components/TopRatedMovies';
import UpComingMovies from '../components/UpComingMovies';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


function Movies() {
    const [movieSearch, setmovieSearch] = useState([]);
    const [selectedmovieSearch, setSelectedmovieSearch] = useState('');
    const [trailer, setTrailer] = useState(false);
    const [info, setInfo] = useState(false);
    
    const usenavigate = useNavigate();
    const [user, setUser] = useState('');
    useEffect(()=>{
        let name = sessionStorage.getItem('name');
        if(name === "" || name === null){
            // usenavigate('/SignIn');
        }else{
            setUser(name);
        }console.log(user); 
    });

    const url = "https://api.themoviedb.org/3";
    const backdropPath = "https://image.tmdb.org/t/p/original";
  
    /**fetch movies data from api */ 
      const fetchMoviesSeries = async () =>{
        const {data : {results}} = await Axios.get(`${url}/movie/now_playing`,{
            params: {
            api_key: '79350a2160a81306468e03a81e4ca934'
            }
        })
        selectMovie(results[0]);
        setmovieSearch(results);
        setSelectedmovieSearch(results[0]);
        console.log(results);
      }
     
    /**fetch single movie data from api */ 
    const fetchmovieSearch = async (id) =>{
        const {data} = await Axios.get(`${url}/movie/${id}`,{
            params: {
                api_key: '79350a2160a81306468e03a81e4ca934',
                append_to_response: 'videos'
                }
        })
        return data;
    }

    const selectMovie = async (movie) =>{
        setTrailer(false);
        const data = await fetchmovieSearch(movie.id);
        setSelectedmovieSearch(data);
    }

     useEffect(()=>{
        fetchMoviesSeries();
     }, [])
  
    const renderMoviesSearch = () =>(
        movieSearch.map(movieSearch =>(
            <MoviesComponent 
                key = {movieSearch.id}
                movieSearch = {movieSearch}
                selectMovie = {selectMovie}
            />
        ))
    )
     const renderTrailer = () =>{
        const trailer = selectedmovieSearch.videos.results.find(vid => vid.name === 'Official Trailer');

        return(
            <Youtube 
                videoId = {trailer.key}
                className = {"youtube-container"}
                opts={{
                    width : "100%",
                    height: "80%",
                    playerVars: {
                        autoplay: 1,
                        controls: 0
                    }
                }}
            />
        )
     }
  return (
    <>
    <div className='containerMovie'>
        <div className='movieTrailerMovie' style={{backgroundImage: `url(${backdropPath}${selectedmovieSearch.backdrop_path})`}}>
             {selectedmovieSearch.videos && trailer ? renderTrailer() : null}
            <div className='captionMovie'>
                <h1>{selectedmovieSearch.title}</h1>
                {selectedmovieSearch.overview && info? <p>{selectedmovieSearch.overview}</p> : null}
                <input type ="submit"  value = "Play" className='playTrailerMovie' onClick={()=>setTrailer(true)}/><InfoOutlinedIcon fontSize='large' className='info' onClick={()=>setInfo(!info)} style={{color: "white"}}/>
                {trailer ? <input type ="submit"  value = "Close" className='closeTrailer' onClick={()=>setTrailer(false)}/> : null}
            </div>
        </div>  
        <div className='sliderMovie'>
            <div className='slider-trackMovie'>
                {renderMoviesSearch()}
            </div>
        </div>
        <div className='trendingNow'>
            <PopularMovies/>
            <TopRatedMovies/>
            <UpComingMovies/>
        </div>
    </div>
        <Nav_bar_2 user = {user}/>
        <Footer/> 
       </>
  );
}

export default Movies;
