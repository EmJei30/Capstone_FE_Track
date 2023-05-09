import '../stylesheets/Nav_bar.css';
import React , {useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Featured from '../pages/Featured';
import SearchIcon from '@mui/icons-material/Search';
import { Padding } from '@mui/icons-material';


function Nav_bar({user}) {  
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOped, setIsOpen] = useState(false);

    window.onscroll =()=>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
           return () => window.onscroll = null; 
    };
    return (
   
          <div className={isScrolled ? "nav-bar scrolled":"nav-bar "}>
              <div className='list'>
                  <div>
                    <div className='nav-logo'>
                      <NavLink to="/"  className='linkStyle'><img src= {Logo} className='logo2' alt ="pic"/></NavLink>
                      </div>
                  </div>
                  <div>
                      <NavLink to="/home"  className='linkStyle'>Home</NavLink>
                  </div>
                  <div>
                      <NavLink to="/series"  className='linkStyle'>Series</NavLink>
                  </div>
                  <div>
                      <NavLink to="/movies"  className='linkStyle'>Movies</NavLink>
                  </div>
                  <div>
                      <NavLink to="/search" className='linkStyle'><SearchIcon className='searchIcon'/></NavLink>
                  </div>
                  <div>
                      <NavLink to="/liveTv"  className='linkStyle'></NavLink>
                  </div>
                  <div>
                      <NavLink to="/more"  className='linkStyle'></NavLink>
                  </div>
            </div>
            {!user ?
            <div className='right-list'>
                <div>
                    <NavLink to="/settings"  className='linkStyle'>Settings</NavLink>
                </div>
                <div>
                    <NavLink to="/contactus" s className='linkStyle'>Contact Us</NavLink>
                </div>
                <div>
                    <NavLink to="/signup"  className='linkStyle'>Sign Up</NavLink>
                </div>
                <div>
                    <NavLink to="/signin"  className='linkStyle'>Sign In</NavLink>
                </div>
            </div>
                
            :
                
            <div className='right-list'>
                <div>
                    <NavLink to=""  className='linkStyle'></NavLink>
                </div>
                <div>
                <NavLink to="/contactus" s className='linkStyle'>Contact Us</NavLink>
                </div>
                <div>
                    <NavLink to="/myaccount"  className='linkStyle'>My Account</NavLink>
                </div>
                <div>
                    <NavLink to="/signin"  className='linkStyle'>Sign Out</NavLink>
                </div> 
            </div>
          
             }   
        </div>
    );
  }
  
  export default Nav_bar;
  