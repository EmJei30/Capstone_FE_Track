import React from "react";
import '../stylesheets/Footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import logo from '../assets/images/logo.png';

function Footer(){
    return (
        <div className="footerContainer">
            <div className="footerLogo">
                <img src = {logo}/>
            </div>
            <div className="supportList">
                <ul >
                    <li><a href="#">Help</a></li>
                    <li><a href="#">Privacy (Updated)</a></li>
                    <li><a href="#">Terms</a></li>
                    <li><a href="#">Legal Notice</a></li>
                </ul>
               
            </div>
            <div  className="iconList">
                <ul>
                    <li><a href="https://www.facebook.com/HBOAsia/" ><img className="icon" src = "https://www.hbogoasia.ph/static/mobile/logo_facebook.svg" /></a></li>
                    <li><a href="https://twitter.com/HBOAsia" ><img className="icon" src = "https://www.hbogoasia.ph/static/mobile/logo_twitter.svg" /></a></li>
                    <li><a href="https://www.youtube.com/user/HBOAsia" ><img className="icon" src = "https://www.hbogoasia.ph/static/mobile/logo_youtube.svg" /></a></li>
                    <li><a href="https://www.instagram.com/hboasia/" ><img className="icon" src = "https://www.hbogoasia.ph/static/mobile/logo_instagram.svg" /></a></li>
                </ul>
            </div>
            <div className="copyright">
                 <p> &copy;2023 HBO Asia. All Rights Reserved. </p>
            </div>
        </div>
    )
}
export default Footer;