import '../stylesheets/Nav_bar.css';
import React , {useState } from 'react';
import {NavLink, Link} from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import Featured from '../pages/Featured';


function Nav_bar() {  
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOped, setIsOpen] = useState(false);

    window.onscroll =()=>{
        setIsScrolled(window.pageYOffset === 0 ? false : true);
           return () => window.onscroll = null; 
    };
    return (
   
          <div className={isScrolled ? "nav-bar scrolled":"nav-bar "}>

            <div className='mainList' >
                <div className='browse'onClick={()=>setIsOpen(true)}>
                    <Link to="/home" className='linkStyle' >BROWSE</Link>
                    <Link to="/signin"  className='linkStyle'>SIGN IN</Link>
                </div>
                <div>
                    <div className='nav-logo1'>
                        <Link to="/"  className='linkStyle'><img src= {Logo} className='logo1' alt ="pic"/></Link>
                    </div>
                </div>
                <div className='subscribe'>
                    <div><Link to="/signup"  className='subscribeText'>SUBSCRIBE NOW</Link></div>
                </div>
            </div>
        
          </div>
    );
  }
  
  export default Nav_bar;
  