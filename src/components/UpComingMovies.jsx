import React, {useRef, useEffect, useState} from "react";
import Axios from "axios";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import play2 from '../assets/images/play2.png'
import '../stylesheets/UpComingMovies.css';
import { useNavigate } from 'react-router-dom';

function UpComingMovies(){
    const listRef = useRef();
    const [slideNum, setSlideNum] = useState(0);
    const [isMoved, setIsMoved] = useState(false);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [selectedTrendingMovie, setSelectedTrendingMovie] = useState('');
    const image_path = "https://image.tmdb.org/t/p/w780/";
    const url = "https://api.themoviedb.org/3";
    const usenavigate = useNavigate();
  
    /**fetch movies data from api */ 
      const fetchTrendingMovies = async () =>{
        const {data : {results}} = await Axios.get(`${url}/movie/upcoming`,{
            params: {
            api_key: '79350a2160a81306468e03a81e4ca934'
            }
        })
        setTrendingMovies(results);  
      }
      useEffect(()=>{
        fetchTrendingMovies();
       }, [])

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

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        if(direction === "left" && slideNum > 0){
            setSlideNum(slideNum - 1);
            listRef.current.style.transform = `translateX(${230 + distance}px)`;
        }
        if(direction === "right" && slideNum < trendingMovies.length -4){
            setSlideNum(slideNum + 1);
            listRef.current.style.transform = `translateX(${-230 + distance}px)`;
        }
    }
    
    /*--play movie selected--*/
    const handleClickPlay = () =>{
        usenavigate("/playmovie", {state : {data : selectedTrendingMovie}});
    }
    return(
        <>
        <div className="movieListUC">
            <div className="listTitleUC">Upcoming Movies<ArrowForwardIosOutlinedIcon fontSize="small" className="arrow"/></div>
            <div className="wrapperUC">
                <ArrowBackIosOutlinedIcon className="sliderArrowUC left" onClick ={()=>handleClick("left")} style={{display: !isMoved && "none"}}/>
                     <div className="movieContainerUC" ref = {listRef}>
                        {trendingMovies.map(mov =>(
                            <div className="trending"  onClick={handleClickPlay}>      
                            <div className="listItemUC" onMouseEnter={()=>selectMovie(mov)}>
                                <div className="holderUC">
                                    <img className ='trendingImageUC' src={`${image_path}${mov.backdrop_path}`}alt ="pic"/>
                                    <p>{mov.title}</p>
                                </div>
                                <div className='over-layUC'>
                                   <img src ={play2} alt ="pic" className='overlay-img'/>
                                </div>
                            </div>     
                        </div>
                        ))};

                        {/* {renderTrendingMovies()} */}
                    </div>
                <ArrowForwardIosOutlinedIcon className="sliderArrowUC right" onClick ={()=>handleClick("right")} />           
            </div>    
        </div> 
        </>
    )
}
export default UpComingMovies;
 