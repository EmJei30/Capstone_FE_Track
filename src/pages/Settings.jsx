import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import '../stylesheets/Settings.css';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import Logo from '../assets/images/logo2.png';


function Settings(){
    

    return (
        <> 
        <Nav_bar_2/>
        <div className="SettingsContainer">
            <div className="sideBar">
                <label>SETTINGS</label>
                <p>System Information</p>
                <Link to="/home"><div className="homeBtn"><input type="submit" value = "Back to Home" className ="back"/></div></Link>
            </div>
            <form className="settingsForm">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                    <div className="settingCon">
                        <label className="info">System Information</label>
                        <p className = "errorMsg1">HBO GO ACCOUNT</p>
                        <span>Not signed in</span>
                        
                        <p className = "errorMsg1">INTERNET BROWSER VERSION</p>
                        <span>Chrome 112 on Windows OS </span>

                        <p className = "errorMsg1">HPUBLIC IP</p>
                        <span>112.202.11.85</span>
                        <p className = "errorMsg1">STREAMING SPEED FROM HBO GO SERVER</p>
                        <span>CDN 1 (-)</span>
                        <span>CDN 2 (-)</span>
                    </div>  
                <div className="settingBtn"><input type="submit" value = "Run" className ="btn"/></div>
                    
            </form>
        <Footer/>
        </div> 
        </>
    )
}
export default Settings;