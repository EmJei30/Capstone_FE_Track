import '../stylesheets/App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from '../pages/Home';
import Movies from '../pages/Movies';
import Series from '../pages/Series';
import Search from '../pages/Search';
import LiveTv from './LiveTv';
import More from './More';
import MyAccount from '../pages/MyAccount';
import ContactUs from '../pages/ContactUs';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Settings from '../pages/Settings';
import React,{ useState, useEffect } from 'react';
import Featured from '../pages/Featured';
import PlayMovie from '../components/PlayMovie';

function App() {  
  

  return (
    <Router>  
      
            <Routes>
                <Route exact path='/' element={<Featured/>}></Route>
                <Route exact path='/home' element={<Home/>}></Route>
                <Route exact path='/series' element={<Series/>}></Route>
                <Route exact path='/movies' element={<Movies/>}></Route>
                <Route exact path='/search' element={<Search/>}></Route>
                <Route exact path='/liveTv' element={<LiveTv/>}></Route>
                <Route exact path='/more' element={<More/>}></Route>

                <Route exact path='/signin' element={<SignIn/>}></Route>
                <Route exact path='/signup' element={<SignUp/>}></Route>
                <Route exact path='/myaccount' element={<MyAccount/>}></Route>
                <Route exact path='/settings' element={<Settings/>}></Route>
                <Route exact path='/contactus' element={<ContactUs/>}></Route>
                <Route exact path='/playmovie' element={<PlayMovie/>}></Route>
            </Routes>
         
        
    </Router>
  );
}

export default App;
