import '../stylesheets/Home.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import MovieCard from '../components/MovieCard';
import Youtube from 'react-youtube';
import TrendingNow from '../components/TrendingNow';
import TrendingWeekly from '../components/TrendingWeekly';
import Popular from '../components/Popular';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';


function Home() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState('');
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
      const fetchMovies = async () =>{
        const {data : {results}} = await Axios.get(`${url}/discover/movie`,{
            params: {
            api_key: '79350a2160a81306468e03a81e4ca934'
            }
        })
        selectMovie(results[0]);
        setMovies(results);
        setSelectedMovie(results[0]);
      }
     
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

    const selectMovie = async (movie) =>{
        setTrailer(false);
        const data = await fetchMovie(movie.id);
        setSelectedMovie(data);
    }

     useEffect(()=>{
      fetchMovies();
     }, [])
  
     const renderMovies = () =>(
        movies.map(movie =>(
            <MovieCard 
                key = {movie.id}
                movie = {movie}
                selectMovie = {selectMovie}
            />
        ))
     )
     const renderTrailer = () =>{
        const trailer = selectedMovie.videos.results.find(vid => vid.name === 'Official Trailer'||
        vid.name === 'Official Trailer 1' || vid.name === 'Trailer');

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
    <div className='containerHome'>
        <div className='movieTrailer' style={{backgroundImage: `url(${backdropPath}${selectedMovie.backdrop_path})`}}>
             {selectedMovie.videos && trailer ? renderTrailer() : null}
            <div className='caption'>
                <h1>{selectedMovie.title}</h1>
                {selectedMovie.overview && info ? <p>{selectedMovie.overview}</p> : null}
                <input type ="submit"  value = "Play" className='playTrailer' onClick={()=>setTrailer(true)}/><InfoOutlinedIcon fontSize='large' className='info' onClick={()=>setInfo(!info)} style={{color:"white"}}/>
                {trailer ? <input type ="submit"  value = "Close" className='closeTrailer' onClick={()=>setTrailer(false)}/> : null}
            </div>
        </div>  
        <div className='sliderHome'>
            <div className='slider-trackHome'>
                {renderMovies()}
            </div>
        </div>
        <div className='trendingNow'>
            <TrendingNow/>
            <TrendingWeekly />
            <Popular/> 
        </div>
    </div>
        <Nav_bar_2 user = {user}/>
        <Footer/> 
       </>
  );
}

export default Home;
