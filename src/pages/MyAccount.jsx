import { useState, useEffect } from 'react';
import {Link, NavLink} from 'react-router-dom';
import '../stylesheets/MyAccount.css';
import Logo from '../assets/images/logo2.png';
import Nav_bar_2 from '../components/Nav_bar_2';
import Footer from '../components/Footer';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';



function MyAccount() {
  const [user, setUser] = useState([]);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');







  useEffect(()=>{
      let name = sessionStorage.getItem('name');
      let email = sessionStorage.getItem('email');
      let password = sessionStorage.getItem('password');
      if(name === "" || name === null){
          // usenavigate('/SignIn');
      }else{
          setUser({
            name : name,
            email: email,
            password: password
          });
      }
      console.log(user); 
  });





  useEffect(()=>{
    const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(!email){
        setErrorEmail(false);
    }else{
        if(!regEx.test(email)){
            setErrorEmail(true);
       }else if(regEx.test(email)){
            setErrorEmail(false);
       }
    }
},[email]);

useEffect(()=>{
    if(!password){
        setErrorPassword(false);
    }else{
        if(password.length < 6){
            setErrorPassword(true);
        }else if(password.length >= 6 ){
            setErrorPassword(false);
        }
    }
},[password]);





  return (
      <> 
      <Nav_bar_2/>
      <div className="SettingsContainer">
          <div className="sideBar">
              <label>MY ACCOUNT</label>
              <p className='sideNav' name = 'profile' >Profile</p>
             
              <Link to="/home"><div className="homeBtn"><input type="submit" value = "Back to Home" className ="back"/></div></Link>
          </div>
          <form className="myAccountForm">
              <div className="logo">
                  <img src={Logo} alt="logo"/>
              </div>
              <div className="accountText"><label>Profile</label></div>
              <div className="signInEmail">
                        <label>NAME</label>
                        <input type="text" name = "email" placeholder="E.g.MjC@hbogoasia.com" className = "SignInEmail" value = {user.name} disabled = "true"/>
                        <p className = "errorMsg1">{errorEmail ? "Invalid email format":""}</p>
                    </div>
              
                    <div className="signInEmail">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" name = "email" placeholder="E.g.MjC@hbogoasia.com" className = "SignInEmail" value = {user.email}  disabled = "true"/>
                        <p className = "errorMsg1">{errorEmail ? "Invalid email format":""}</p>
                    </div>
          </form>    
      <Footer/>
      </div> 
      </>
  );
}

export default MyAccount;