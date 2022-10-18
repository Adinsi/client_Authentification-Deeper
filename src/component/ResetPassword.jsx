import React, { useState } from 'react';
import SignIn from './SignIn';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ResetPassword = () => {
    const href = window.location.href;
    const token = href.slice(45) 
    const resetLink = token;
    
   
        const [newPass, SetnewPass] = useState('');
    const [controlPassword, setControlPassword] = useState('');
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
    const [request, setRequest] = useState(false);
    const sendRquest = async () => {
        


 const res =  await axios
            .put(`${process.env.REACT_APP_URL_USER}reset-password`,
                
 {
 
     resetLink,
     newPass
   
              }
 ).catch(error => {

     console.log(error)
 })
                
    const data = await res.data;
    return data;
}
    const handleSubmit = async (e) => {

        e.preventDefault();
            const passwordConfirmError = document.querySelector(
        ".password-confirm.error");
         if (newPass !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
    
 else sendRquest().then(() => setRequest(true) )
        
        
      
  }
    return (
        <>
            {
                request ? <>
                 
                 <SignIn />
                       <p>Mot de passe changer avec sucess</p>
                </> : 
                          <div className="overlay">
            
   

<form className='formSign' method='post' onSubmit={handleSubmit}>
   
   <div className="con">
   
   <header className="head-form">
      <h2>Nouveau mot de passe</h2>

      <p>Mettez un mot de passe sécurisez </p>
   </header>
   
   <br></br>
   <div className="field-set">
     
      
        
        
     
     
      <span className="input-item">
        <i className="fa fa-key"></i>
       </span>
    
      <input className="form-input" type="password" placeholder="Votre mot de passe" minLength={6}  id="password"
            onChange={(e) => SetnewPass(e.target.value)}
            value={newPass}  name="password" required />
 
     
                        <br></br>  <br></br>
                        <span className="input-item">
        <i className="fa fa-key"></i>
                        </span>
                       
    
      <input className="form-input" type="password" placeholder="confirmer votre mot de passe" id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
          name='password'  value={controlPassword} />
     

     <span>
        <i  className={eye ? "fa-solid fa-eye": "fa-solid fa-eye-slash" }  onClick={Eyeclick} aria-hidden="true"  type="button" id="eye"></i>
     </span>
     
                        <div className='password-confirm error'>
                            
     </div>
     
     
      <br></br>
      <button className="log-in"> Changer le mot de passe </button>
   </div>
  
                <br></br>
                
  
     
  </div>
  
  <NavLink style={{color:'white'}} to='/'>Go to home</NavLink>

         
          </form>
</div> 
            }
        </>
    );
};

export default ResetPassword;