import '../stylesheets/Featured.css';
import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import Nav_bar from '../components/Nav_bar';
import Footer from '../components/Footer';
import img1 from '../assets/images/tv.png';
import dis from '../assets/images/dis.png';
import ban1 from '../assets/images/ban1.png';
import ban2 from '../assets/images/ban2.png';
import sky from '../assets/images/sky.png';
import cignal from '../assets/images/cignal.png';
import globe from '../assets/images/globe.png';
import play from '../assets/images/play.png';
import { useNavigate } from 'react-router-dom';



function Featured() {
    const [movieFeatured, setMovieFeatured] = useState([]);
    const [selectedFeatured, setSelectedFeatured] = useState('');
    const usenavigate = useNavigate();

    const url = "https://api.themoviedb.org/3";
    const image_path = "https://image.tmdb.org/t/p/w500/";
  
    /**fetch movie data from api */ 
      const fetchMovies = async () =>{
        const data = await Axios.get(`${url}/discover/movie`,{
            params: {
            api_key: '79350a2160a81306468e03a81e4ca934'
            }
        })
        setMovieFeatured(data.data.results);
       
      }
     useEffect(()=>{
      fetchMovies();
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
    const selectMovie = async (movie) =>{
        const data = await fetchMovie(movie.id);
        setSelectedFeatured(data);
    }

    /*--play movie selected--*/
    const handleClick = () =>{
        usenavigate("/playmovie", {state : {data : selectedFeatured}});
    }


console.log(selectedFeatured);

  return (
  
    <div className='featuredContainer'>
        <div className='sub-Con'>
            <img className ='featuredCover' src={'https://dai3fd1oh325y.cloudfront.net/images/apiupload/banner/1b4aeb5f-5adb-414b-8475-4ee391d9c832.jpg' } alt ="pic"/>
        </div>
        <div className='featuredMovies'>
            <h1 className='new'>Discover Something New</h1>
            <div className='slider'>
                <div className='slider-track'>
                    <div className='slide'>
                        {movieFeatured.map(movie=>(
                            <div className='slide-con' key = {movie.id} onMouseEnter={()=>selectMovie(movie)}>
                                <div className='imageDiv'>
                                    <img className ='featuredImg' src={`${image_path}${movie.poster_path}`}alt ="pic"/>
                                </div> 
                                <div className='overlay'>
                                    <a className='overlayText' onClick={handleClick}>Watch now<img src ={play} alt ="pic"/></a>
                                </div>
                            </div> 
                        )) }
                        
                    </div>
                </div>
            </div>
        </div>
        <div className='banner'>
            <h1>Watch Anything, Anywhere</h1>
            <h2>Enjoy the big screen experience on your smart TV, or watch on the go on your smartphones.</h2>
            <img src = {img1} alt ="pic"/>
        </div>
        <div className='banner2'>
            <img  className='ban1' src = {ban1} alt ="pic"/>
            <img className='ban2' src = {ban2} alt ="pic"/>
        </div>
        <div className='banner3'>
            <h1>Stream all your favourites and more</h1>
            <div className='planContainer'>
                <div className='plan1'>
                    <div className ='h3'>12-month plan</div>     
                    <div className ='h2'>₱1,190/12-mo</div>   
                    <div className ='h4'>Renews every 12 months</div> 
                    <div className='img'><img src ={dis}/></div>
                    <a href='#'>SUBSCRIBE NOW</a>               
                </div>
                <div className='plan2'>
                    <div className ='h3'>3 month Plan</div>     
                    <div className ='h2'>₱399/3-mo</div>   
                    <div className ='h4'>Renews every 3 months</div>
                    <a href='#'>SUBSCRIBE NOW</a>    
                </div>
                <div className='plan3'>
                    <div className ='h3'>Monthly Plan</div>     
                    <div className ='h2'>₱199/mo</div>   
                    <div className ='h4'>Renews every month</div> 
                    <a href='#'>SUBSCRIBE NOW</a>               
                </div>
            </div>
        </div>
        <div className='banner4'>
            <div><h1>Our Partners</h1></div>
            <div> <img src ={sky} alt ="pic"/> </div>
            <div> <img src ={cignal} alt ="pic"/></div>
            <div> <img src ={globe} alt ="pic"/></div>                
        </div>
        <Nav_bar/>
        <Footer/> 
       
    </div>
  );
}

export default Featured;
