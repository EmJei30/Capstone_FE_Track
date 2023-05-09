import React, {useState, useEffect} from 'react';
import '../stylesheets/Search.css';
import Nav_bar_2 from '../components/Nav_bar_2';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Search() {
	const [user, setUser] = useState('');
	const [searchKey, setSearchKey] = useState('');
	const [ searchedMovie, setSearchedMovie] = useState([]);
	const [searchedSelectedMovie, setSearchedSelectedMovie] = useState('');
	const url = "https://api.themoviedb.org/3";
	const image_path = "https://image.tmdb.org/t/p/w780/";
	const usenavigate = useNavigate();

	useEffect(()=>{
		let name = sessionStorage.getItem('name');
		if(name === "" || name === null){
			// usenavigate('/SignIn');
		}else{
			setUser(name);
		}console.log(user); 
	});

	/**fetch movies data from api */ 
	const searchMovie = async (searchKey) =>{
		const {data : {results}} = await Axios.get(`${url}/search/movie`,{
			params: {
			api_key: '79350a2160a81306468e03a81e4ca934',
			query: searchKey
			}
		})
		setSearchedMovie(results);
	}

console.log(searchKey)
	const handleSearch = (e) =>{
		e.preventDefault();
		searchMovie(searchKey);
	}
	
	 /*--play movie selected--*/
	 const handleClickPlay = () =>{
        usenavigate("/playmovie", {state : {data : searchedSelectedMovie}});
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
    const selectMovie = async (mov) =>{
        const data = await fetchMovie(mov.id);
        setSearchedSelectedMovie(data);
    }

	return (
		<>		
		<div className="SearchContainer">
			<form className='search' onSubmit={handleSearch}>
				<label>Search</label>
				<input type = "text" placeholder = "What Are you Searching for?" value = {searchKey} onChange = {(e)=>setSearchKey(e.target.value)} autoFocus/>
			</form>
			<Nav_bar_2 user = {user}/> 
		</div>
		<div className='searchCon' onClick={handleClickPlay}>
			{ searchedMovie ? searchedMovie.map(searchMovie=>(
				<div className='searchSubCon' key = {searchedMovie.id} onMouseEnter={()=>selectMovie(searchMovie)}>
					 {searchMovie.poster_path ?
						<img className ='trendingImageTW' src={`${image_path}${searchMovie.poster_path}`}alt =""/> :
						<div className='noImage'>No Image found</div>}
					<p>{searchMovie.title}</p>
				</div>
			)) : 
			<div className='searchSubCon'>
				<h1>Movie not found!</h1>
			</div>}
		</div>
		</>

	);
}

export default Search;
