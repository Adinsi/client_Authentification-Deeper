import React, { } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/componentstyles/Navbar.scss';

const Navbar = () => {
                  //  Fonction pour gerer le state du Burger menu
  
   
              //    Fonction pour gérer le state de la langue 
   

             // Desactiver le menu au scroll de la page 

    return (
       <nav>
            <div className="container">
                <div className="logo">
                      <NavLink to='/home'> <img src='../assets/logo.jpg'  alt='Logo du site'/></NavLink>
              
                </div>
                <div className="links">
                    <ul className="menu">
                
                        <li><NavLink to='/home' >
<i style={{ padding: "0px 15px", fontSize: "35px", color: "white", cursor: "pointer" }} class="fa-solid fa-home"></i>
                        </NavLink></li>
                        <li><NavLink to='/profil'><i style={{ padding: "0px 15px", fontSize: "35px", color: "white", cursor: "pointer" }} class="fa-solid fa-user"></i></NavLink></li>
                        <li><NavLink to='/search'><i style={{ padding: "0px 15px", fontSize: "35px", color: "white", cursor: "pointer" }} class="fa-solid fa-search"></i></NavLink></li>
                           <li><NavLink to='/help'><i   style={{padding:"0px 15px",fontSize:"35px",color:"white",cursor:"pointer"}} class="fa-solid fa-book"></i></NavLink></li>
                       
                        {/* <li  ><NavLink to='/'>FR <i onClick={handleLanguage} onMouseEnter={handleLanguage} className="fa-solid fa-circle-chevron-down"></i></NavLink>  
                        </li> */}
                        {/* <li>
 {
                            LangState ? 
                                <div className='langue'>
                                   <NavLink to='/'>FRANCAIS</NavLink>
                                   <NavLink to='/' >ENGLISH</NavLink>
                                    
                          </div> : null

                        }
                        </li> */}
                       
</ul>
                </div>
         
            </div>
       
            
        </nav>
    );
};

export default Navbar;