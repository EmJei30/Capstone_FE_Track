import React, { useState, useEffect } from "react";
import {Link, useNavigate} from 'react-router-dom';
import '../stylesheets/SignIn.css';
import Footer from '../components/Footer';
import Nav_bar_2 from '../components/Nav_bar_2';
import Home from './Home';
import Logo from '../assets/images/logo2.png';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignIn(){
    const [visible, setVisible] = useState(false);
    const [modal, setModal] = useState(false);
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [enterEmail, setEnterEmail] = useState('');
    const [updateDisabled, setUpdateDisabled] = useState(true);
    const [errorUpdateEmail , setErrorUpdateEmail ] = useState('');

    const usenavigate = useNavigate();
    
    useEffect(()=>{
        sessionStorage.clear();
    },[]);
    const handleSubmit = (e) =>{
        e.preventDefault();

       
    fetch("http://localhost:8000/user/").then((res)=>{
        return res.json();
        }).then((resp)=>{
            if(resp[0].email !== email){
                toast.warning("Please enter valid email")
            }else{
                    if(resp[0].password === password){
                            toast.success('Login successfull');
                            sessionStorage.setItem('name', resp[0].name);
                            sessionStorage.setItem('email', resp[0].email);
                            sessionStorage.setItem('password', resp[0].password);
                            usenavigate('/home');
                    }else{
                        toast.error("Incorrect password");
                    }
            }
        }).catch((err)=>{
           toast.warning('failed'+ err.message);
        });
    }
    const toggleModal= ()=>{
        setModal(!modal);
    }
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

    useEffect(()=>{   
        if(email && password){
            if(!errorEmail &&  !errorPassword){
                setIsDisabled(false);
            }else if(errorEmail ||  errorPassword){
                setIsDisabled(true);
            }
        }
    },[errorEmail, errorPassword]);
   
    useEffect(()=>{
        const regEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if(!enterEmail){
            setErrorUpdateEmail(false);
        }else{
            if(!regEx.test(enterEmail)){
                setErrorUpdateEmail(true);
           }else if(regEx.test(enterEmail)){
                setErrorUpdateEmail(false);
           }
        }
    }, [enterEmail]);

    useEffect(()=>{   
        if(enterEmail){
            if(!errorUpdateEmail ){
                setUpdateDisabled(false);
            }else if(errorUpdateEmail ){
                setUpdateDisabled(true);
            }
        }
    },[errorUpdateEmail]);


    return (
        <> 
        <Nav_bar_2/>
        <div className="signInContainer">
            <form className="signInForm" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="signinText"><label>SIGN IN</label></div>
                    <div className="signInEmail">
                        <label>EMAIL ADDRESS</label>
                        <input type="email" name = "email" placeholder="E.g.MjC@hbogoasia.com" className = {errorEmail ? "SingInemailError":"SignInEmail"} value = {email} onChange={(e)=>setEmail(e.target.value)} autoFocus required/>
                        <p className = "errorMsg1">{errorEmail ? "Invalid email format":""}</p>
                    </div>
                    <div className="signInPassword">
                        <label>PASSWORD</label>
                        <div className="inputPassword">
                            <input type={visible ? "text" : "password"} name = "password" className = {errorPassword ? "SignInPasswordError":"SignInPassword"} value = {password} onChange={(e)=>setPassword(e.target.value)}  required/>
                            <div className={errorPassword? "showPasswordError":"showPassword"} onClick={()=>setVisible(!visible)} >{visible ? <VisibilityIcon/>:<VisibilityOffIcon/> }</div>
                            <div className="errorMsg3"> {errorPassword ? "Must be at least 6 characters long":""}</div>
                        </div>
                    </div>
                    <div className="forgotPass" onClick={toggleModal}>Forgot password?</div>
                    <div className="SignInBtn"><input type="submit" value = "Submit" className = {isDisabled ? "disabled":"enabled"} disabled = {isDisabled} />
                    <Link to="/home"><input type="submit" value = "Back to Home" className ="back"/></Link></div>
                    <div className="signUpBtn" >Doesn't have an account?
                    <Link to="/signup" className="signUp"> Sign Up</Link>
                    </div>
            </form>
        <Footer/>
        {modal &&
            <div className="modal" >
                <div className="overlay1">
                    <form className="popUp">
                        <div className="closeBtn" onClick={toggleModal}><HighlightOffIcon/></div>
                        <div className="updateText"><label>FORGOT PASSWORD?</label></div>
                        <div className="popUptext"><span>We will send instructions to your registered email to reset your password.</span></div>
                        <div className="popUpEmail">
                            <label>EMAIL ADDRESS</label>
                            <input type="email" name = "email" placeholder="E.g.MjC@hbogoasia.com" className = {errorUpdateEmail ? "enterEmailError":"enterEmail"} value = {enterEmail} onChange={(e)=>setEnterEmail(e.target.value)} autoFocus required/>
                            <p className = "errorMsg4">{errorUpdateEmail ? "Invalid email format":""}</p>
                        </div>   
                        <div className="updateBtn"><input type="submit" value = "Update" className = {updateDisabled ? "disabled":"enabled"} disabled = {updateDisabled} /></div>
                        
                    </form>
                </div>
            </div>
         }
         <ToastContainer position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"/>
        </div> 
        </>
    )
}
export default SignIn;