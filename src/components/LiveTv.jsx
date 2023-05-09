import { useState, useEffect } from 'react';
import '../stylesheets/App.css';
import Nav_bar_2 from './Nav_bar_2';
import Footer from './Footer';



function LivetTV() {
  const [user, setUser] = useState('');
  useEffect(()=>{
      let name = sessionStorage.getItem('name');
      if(name === "" || name === null){
          // usenavigate('/SignIn');
      }else{
          setUser(name);
      }console.log(user); 
  });
  return (
    <div className="about">
        liveTD
        <Nav_bar_2 user = {user}/>
        <Footer/> 
    </div>
  );
}

export default LivetTV;
