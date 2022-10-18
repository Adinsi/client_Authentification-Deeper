import React, { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, Setemail] = useState('');
    const [request, setRequest] = useState(false);
   
    const sendRquest = async () => {
         const emailError = document.querySelector(".email.error");
 const res =  await axios
            .put(`${process.env.REACT_APP_URL_USER}forget-password`,
                
 {
 
   email,
   
              }
 ).catch(error => {
    emailError.innerHTML =error.response.data.message
     console.log(error)
 })
                
    const data = await res.data;
    return data;
}
    const handleSubmit = async (e) => {

    e.preventDefault();
    
 
sendRquest().then(() => setRequest(true) )
        
        
      
  }
    return (
        <>
            {
                request ? <p style={{ textAlign: 'center', margin:'auto',color:'green'}} id='success'>Nous avons envoyé un e-mail à l'adresse enregistrée avec ce compte contenant des instructions supplémentaires pour récupérer votre mot de passe.
Vous rencontrez toujours des difficultés pour vous connecter ? Veuillez contacter l'assistance.</p>: 
                          <div className="overlay">
            
   

<form className='formSign' method='post' onSubmit={handleSubmit}>
   
   <div className="con">
   
   <header className="head-form">
      <h4>Mot de passe oublié</h4>

      <p>Votre adress email </p>
   </header>
   
   <br></br>
   <div className="field-set">
     
      
         <span className="input-item">
           <i className="fa-sharp fa-solid fa-envelope"></i>
         </span>
        
         <input className="form-input" id="txt-input" type="text" placeholder="votre email" name='email' onChange={(e) => Setemail(e.target.value)} value={email} required />
           <div className="email error">
           
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

export default ForgotPassword;