import React, { useState } from 'react';
import axios from 'axios'

import '../styles/componentstyles/SignUp.scss';
import SignIn from './SignIn';
import { useNavigate } from 'react-router-dom';
const SignUp = (props) => {
  const [formSubmit, setFormSubmit] = useState(false);
  
     const [nom, Setnom] = useState('');
  const [prenom, Setprenom] = useState('');
     const [groupe, Setgroupe] = useState('');
  const [activite, Setactivite] = useState('');
     const [email, Setemail] = useState('');
  const [password, Setpassword] = useState('');
  const [controlPassword, setControlPassword] = useState("");
 
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
            .post(`http://localhost:7500/api/user/register`,
                
 {
         nom,
   prenom,
   email,
   groupe,
   activite,
   password
              }
            ).catch(error=> console.log(error))
                
    const data = await res.data;
    return data;
}
     const handleSubmit = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const emailError = document.querySelector(".email.error");
    
   
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error");
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
       termsError.innerHTML = "";
       emailError.innerHTML = ""
    
    
     
    if (password !== controlPassword || !terms.checked) {
      if (password !== controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
       } 
       sendRquest();
       setFormSubmit(true)
  }
    return (

     <>
        {
          formSubmit ? (
          <>  
          <SignIn/> 
           
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
          </> 
         
        
          ) :
              <div className="overlay">
            
   

<form className='formSign' method='post' onSubmit={handleSubmit}>
   
   <div className="con">
   
   <header className="head-form">
      <h2>Inscription</h2>

      <p>Remplissez touts les champs avant de soummettre le formulaire.</p>
   </header>
   
   <br></br>
   <div className="field-set">
     
      
         <span className="input-item">
           <i className="fa fa-user-circle"></i>
         </span>
        
                        <input className="form-input" name='nom' id="nom" type="text" placeholder="Votre nom"  onChange={(e) => Setnom(e.target.value)} value={nom} required />
     
      <br></br>  <br></br>
      
         <span className="input-item">
      <i className="fa-solid fa-user"></i>
         </span>
        
         <input className="form-input" name='prenom' id="prenom" type="text" placeholder="Votre Prenom"  onChange={(e) => Setprenom(e.target.value)} value={prenom} required />
     
                        <br></br>  <br></br>
                         <span className="input-item">
      <i className="fa-sharp fa-solid fa-envelope"></i>
         </span>
        
                        <input className="form-input" name='email' id="email" type="email" placeholder="Votre email" onChange={(e) => Setemail(e.target.value)} value={email} required />
                    <div className="email error"></div>
                      <br></br>
       <span className="input-item">
           <i className="fa fa-user-circle"></i>
         </span>
        
         <input className="form-input" name='groupe' id="groupe" type="text" placeholder="Votre groupe"  onChange={(e) => Setgroupe(e.target.value)} value={groupe} required />
                      <br></br>  <br></br>
                         <span className="input-item">
           <i className="fa fa-user-circle"></i>
         </span>
        
                    <input className="form-input" name='activite' id="activite" type="text" placeholder="Votre domaine d'activité"
                      onChange={(e) => Setactivite(e.target.value)} value={activite} required />
     
                        <br></br>  <br></br>
                       
     
     
        
     
      <span className="input-item">
        <i className="fa fa-key"></i>
       </span>
    
      <input className="form-input" type="password" placeholder="Votre mot de passe" minLength={6}  id="password"
            onChange={(e) => Setpassword(e.target.value)}
            value={password}  name="password" required />
     

     <span>
       
     </span>
     
     
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
                         <p style={{color:'white'}} >   <input style={{width:"20px"}} type="checkbox" id="terms" />
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </p>
          <div className="terms error"></div>
          <br />
      <button type='submit'  className="log-in"> S'inscrire </button>
   </div>
  

   <div className="other">

     
   

   </div>
     
  </div>
  

</form>
</div>
        }
     </> 
     
    );
};

export default SignUp;