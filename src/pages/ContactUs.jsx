import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import '../stylesheets/ContactUs.css';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import Logo from '../assets/images/logo2.png';


function ContactUs(){

    return (
        <> 
        <Nav_bar_2/>
        <div className="aboutUsContainer">
            <div className="sideBar">
                <label>CONTACT US</label>
                <p>System Information</p>
                <Link to="/home"><div className="homeBtn"><input type="submit" value = "Back to Home" className ="back"/></div></Link>
            </div>
            <form className="aboutusForm">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                    <div className="aboutusCon">
                        <label className="info">Contact Us</label>
                        <p className = "errorMsg1">HBO GO account-related issues</p>
                        <span>If you are facing issues with your HBO GO account, please contact go.gethelp@hboasia.com for assistance.</span>
                        
                        <p className = "errorMsg1">Billing and payment related issues</p>
                        <span>If you are paying through iTunes, visit Apple’s support page for more information.</span>
                        <span>If you are paying through Google Play, visit Google Play’s support page for more information.</span>
                        <span>If you are paying through SKYcable, please contact skyserves@mysky.com.ph or call 381-0000 for more assistance. Please include the following important details in your email:</span>

                            <p className="aboutList">Your Name</p>
                            <p className="aboutList">Email Address</p>
                            <p className="aboutList">SKY Account Number</p>
                            <p className="aboutList">SKY Account Last Name</p>
                        <p className = "errorMsg1">Technical issues</p>
                        <span>For technical issues, please reach out to go.gethelp@hboasia.com for assistance.</span>
                        
                    </div>  
                                    
            </form>
        <Footer/>
        </div> 
        </>
    )
}
export default ContactUs;