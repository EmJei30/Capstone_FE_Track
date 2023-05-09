import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../assets/images/logo2.png';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../stylesheets/SignUp.css';

function SignUp(){
    const [visible, setVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [term, setTerm] = useState(false);
    const [policy, setPolicy] = useState(false);
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        let regObj = {email, name, password};

        //storing the users data using the json server rest API
        fetch("http://localhost:8000/user",{
            method : "POST",
            headers: { 'content-type' : ' application/json' },
            body: JSON.stringify(regObj)
        }).then((res) =>{
            toast.success("Account created successfully!");
        }).catch((err) => {
            toast.error("Sign up failed!");
        });

        setName('');
        setEmail('');
        setPassword('');
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
        if(name && !errorEmail &&  !errorPassword && term){
            setIsDisabled(false);
        } 
    },[name, errorEmail, errorPassword, term ]);
    return (
        <>
        <div className="signUpContainer">
            <form className="signUpForm" onSubmit={handleSubmit}>
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="signUpText"><label>CREATE YOUR ACCOUNT</label></div>
                <div className="signUpName">
                        <label>YOUR NAME</label>
                        <div className="inputName">
                            <input type="text" name = "name" placeholder="Name" className = "nameInput" value = {name} onChange={(e)=>setName(e.target.value)} autoFocus required/>
                            
                        </div>
                </div>
                    <div className="signUpEmail">    
                        <label>EMAIL ADDRESS</label>
                        <input type="email" name = "email" placeholder="E.g.MjC@hbogoasia.com" className = {errorEmail ? "emailInputError":"emailInput"} value = {email} onChange={(e)=>setEmail(e.target.value)} required/>
                        <p className = "errorMsg2">{errorEmail ? "Invalid email format":""}</p>
                    </div>
                    <div className="signUpPassword">
                        <label>PASSWORD</label>
                        <div className="inputPassword">
                            <input type={visible ? "text" : "password"} placeholder="Password" name = "password" className = {errorPassword ? "passwordInputError":"passwordInput"} value = {password} onChange={(e)=>setPassword(e.target.value)} required/>
                            <div className={errorPassword ? "showPasswordError":"showPassword"} onClick={()=>setVisible(!visible)} >{visible ? <VisibilityIcon/>:<VisibilityOffIcon/> }</div>
                            <div className={errorPassword? "passwordTextError":"passwordText"}>Must be at least 6 characters long</div>
                        </div>
                    </div>
                    <div className="termsCon"><input type="checkbox" onChange={()=>setTerm(!term)}/> <label>I agree to all <Link to =""className="terms">Terms of Use</Link> and <Link to ="" className="policy">Privacy Policy</Link></label></div>
                    <div className="sendUpdates"><input type="checkbox" onChange={()=>setPolicy(!policy)}/> <label>Send me new updates on HBO GO</label></div>
                    <div className="submitBtn"><input type="submit" value = "Submit" className = {isDisabled ? "disabled":"enabled"} disabled = {isDisabled} />
                    <Link to="/home"><input type="submit" value = "Back to Home" className ="back"/></Link></div>
                    <div className="signUpBtn">Already have an account?
                    <Link to="/signin" className="signIn"> Sign In</Link>
                    </div>
            </form>

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
            <Footer/>
        </div>
        </>
    )
}
export default SignUp;