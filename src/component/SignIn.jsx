import React, { useState} from 'react';

import '../styles/componentstyles/SignIn.scss';
import { NavLink, useNavigate } from "react-router-dom";

import axios from 'axios'

const SignIn = () => {
  const history = useNavigate();
    const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');


    const [eye, seteye] = useState(true);
  
  const Eyeclick = () => {
    seteye(!eye);
    const code = document.getElementById("password");
    if (eye) {
     code.setAttribute("type", "password");
      seteye(false);
    } else {
      
       code.setAttribute("type", "text");
    }
  };
    const sendRquest = async () => {
 const res =  await axios
            .post(`http://localhost:7500/api/user/login`,
                
 {
 
   email,
   password
              }
            ).catch(error=> console.log(error))
                
    const data = await res.data;
    return data;
}
    const handleSubmit = async (e) => {

    e.preventDefault();
    
 
sendRquest().then(() => history('/profil') )
        
        
      
  }
  return (
      
   
                          <div className="overlay">
            
   

<form className='formSign' method='post' onSubmit={handleSubmit}>
   
   <div className="con">
   
   <header className="head-form">
      <h2>Se connecter</h2>

      <p>Connecter vous avec votre email et mot de passe</p>
   </header>
   
   <br></br>
   <div className="field-set">
     
      
         <span className="input-item">
           <i className="fa fa-user-circle"></i>
         </span>
        
         <input className="form-input" id="txt-input" type="text" placeholder="votre email" name='email' onChange={(e) => Setemail(e.target.value)} value={email} required />
           <div className="email error">
           
         </div>
     
      <br></br>
     
        
     
      <span className="input-item">
        <i className="fa fa-key"></i>
       </span>
    
      <input className="form-input" type="password" placeholder="Votre mot de passe" id="password"  onChange={(e) =>  Setpassword(e.target.value)
         } value={password} required />
     

     <span>
        <i className="fa fa-eye"  onClick={Eyeclick}  class={eye ? "fa-solid fa-eye": "fa-solid fa-eye-slash" } aria-hidden="true"  type="button" id="eye"></i>
     </span>
      <div className="password error"></div>
     
      <br></br>
      <button className="log-in"> Se connecter </button>
   </div>
  
                <br></br>
                
  
     
  </div>
  

          <p ><NavLink style={{color:'whitesmoke'}} to='/'>Mot de passe oublié ?</NavLink></p>
          </form>
</div>
               
             )
          }
   
   

export default SignIn;