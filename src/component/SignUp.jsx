import React, { useState } from 'react';
import axios from 'axios'

import '../styles/componentstyles/SignUp.scss';
import SignIn from './SignIn';
import { useNavigate,NavLink } from 'react-router-dom';
const SignUp = (props) => {
  const [formSubmit, setFormSubmit] = useState(false);
  
     const [nom, Setnom] = useState('');
  const [prenom, Setprenom] = useState('');
     const [groupe, Setgroupe] = useState('');
  const [activite, Setactivite] = useState('');
  const [tel, SetTel] = useState('');
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
    const terms = document.getElementById("terms");
    const emailError = document.querySelector(".email.error");
    
   
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error");
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
       termsError.innerHTML = "";
       emailError.innerHTML = ""
    
    
     
    
      if (password !== controlPassword) {
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";
      
    } 
    
 const res =  await axios
            .post(`http://localhost:7500/api/user/register`,
                
 {
         nom,
   prenom,
   email,
   groupe,
   activite,
   tel,
   password
              }
 ).catch(error => {
   if (error.response.data.message.includes("L'utilisateur existe déja ! connecter vous")) {
              emailError.innerHTML = error.response.data.message
   }
   
            })
                
    const data = await res.data;
    return data;
}
     const handleSubmit = async (e) => {
    e.preventDefault();
    
       sendRquest().then(() => {
           setFormSubmit(true)
       });
     
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
                    <h3 className="email error"></h3>
                      <br></br>
       <span className="input-item">
       <i class="fa-solid fa-church"></i>
         </span>
        
         <input className="form-input" name='groupe' id="groupe" type="text" placeholder="Votre groupe"  onChange={(e) => Setgroupe(e.target.value)} value={groupe} required />
                      <br></br>  <br></br>
                         <span className="input-item">
         <i class="fa-solid fa-briefcase"></i>
         </span>
        
                    <input className="form-input" name='activite' id="activite" type="text" placeholder="Votre domaine d'activité"
                      onChange={(e) => Setactivite(e.target.value)} value={activite} required />
     
                        <br></br>  <br></br>
                       
       <span className="input-item">
         <i class="fa-solid fa-phone"></i>
         </span>
        
                    <input className="form-input" name='tel' id="tel" maxLength={8} minLength={8} type="text" placeholder="Telephone"
                      onChange={(e) => SetTel(e.target.value)} value={tel} required />
     
                        <br></br>  <br></br>
     
        
     
      <span className="input-item">
        <i className="fa fa-key"></i>
       </span>
    
      <input className="form-input" type="password" placeholder="Votre mot de passe" minLength={6}  id="password"
            onChange={(e) => Setpassword(e.target.value)}
            value={password}  name="password" required />
 
     
                        <br></br>  <br></br>
                        <span className="input-item">
        <i className="fa fa-key"></i>
                        </span>
                       
    
      <input className="form-input" type="password" placeholder="confirmer votre mot de passe" id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
          name='password' required  value={controlPassword} />
     

     {/* <span>
        <i  className={eye ? "fa-solid fa-eye": "fa-solid fa-eye-slash" }  onClick={Eyeclick} aria-hidden="true"  type="button" id="eye"></i>
     </span> */}
     
                        <h3 className='password-confirm error'>
                            
     </h3>
                        <br></br>
                         <p style={{color:'white'}} >   <input style={{width:"20px"}} type="checkbox" id="terms" required />
            J'accepte les{" "}
            <NavLink to="/condition_generale" >
              conditions générales
            </NavLink>
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