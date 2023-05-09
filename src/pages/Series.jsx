import '../stylesheets/Series.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import MovieSeries from '../components/MovieSeries';
import Youtube from 'react-youtube';
import TopRatedSeries from '../components/TopRatedSeries';
import OnTheAirSeries from '../components/OnTheAirSeries';
import Popular from '../components/Popular';
import { useNavigate } from 'react-router-dom';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';



function Series() {
    const [movieSeries, setMovieSeries] = useState([]);
    const [selectedMovieSeries, setSelectedMovieSeries] = useState('');
    const [trailer, setTrailer] = useState(false);
    const [info, setInfo] = useState(false);
    console.log(movieSeries)
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
        const {data : {results}} = await Axios.get(`${url}/tv/popular`,{
            params: {
            api_key: '79350a2160a81306468e03a81e4ca934'
            }
        })
        selectMovie(results[0]);
        setMovieSeries(results);
        setSelectedMovieSeries(results[0]);
        console.log(results);
      }
     
    /**fetch single movie data from api */ 
    const fetchMovieSeries = async (id) =>{
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
        const data = await fetchMovieSeries(movie.id);
        setSelectedMovieSeries(data);
    }

     useEffect(()=>{
        fetchMoviesSeries();
     }, [])
  
    const renderMoviesSeries = () =>(
        movieSeries.map(movieSeries =>(
            <MovieSeries 
                key = {movieSeries.id}
                movieSeries = {movieSeries}
                selectMovie = {selectMovie}
            />
        ))
    )
     const renderTrailer = () =>{
        const trailer = selectedMovieSeries.videos.results.find(vid => vid.name === 'Official Trailer');

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
    <div className='containerSeries'>
        <div className='movieTrailerSeries' style={{backgroundImage: `url(${backdropPath}${selectedMovieSeries.backdrop_path})`}}>
             {selectedMovieSeries.videos && trailer ? renderTrailer() : null}
            <div className='captionSeries'>
                <h1>{selectedMovieSeries.title}</h1>
                {selectedMovieSeries.overview && info  ? <p>{selectedMovieSeries.overview}</p> : null}
                <input type ="submit"  value = "Play" className='playTrailerSeries' onClick={()=>setTrailer(true)}/><InfoOutlinedIcon fontSize='large' className='info' onClick={()=>setInfo(!info)} style={{color: "white"}}/>
                {trailer ? <input type ="submit"  value = "Close" className='closeTrailer' onClick={()=>setTrailer(false)}/> : null}
            </div>
        </div>  
        <div className='sliderSeries'>
            <div className='slider-trackSeries'>
                {renderMoviesSeries()}
            </div>
        </div>
        <div className='trendingNow'>
            <TopRatedSeries/>
            <OnTheAirSeries/>
            
            
        </div>
        <div className='popular'>

        </div>
        <div className='upComing'>

        </div>
    </div>
        <Nav_bar_2 user = {user}/>
        <Footer/> 
       </>
  );
}

export default Series;
