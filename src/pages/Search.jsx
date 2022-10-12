import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from '../component/Navbar';
import '../styles/pagesstyles/search.scss'
import { setgetAllUsers } from '../features/user.reducers';
import { setgetusers } from '../features/users.reducers';


const Search = () => {
    const [search, setSearch] = useState('');
    // const [users, setUsers] = useState([]);
  const [all, setAll] = useState(false)
 
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users.users);
  const handleClick = () => {
    console.log(user.id)
  }
    
//     const dispatch = useDispatch();
//    const users = useSelector((state)=>state.users.users);
    

    console.log(users);
    return (
       
        <div>
            <Navbar />
        <br /><br /><br /><br />
       <h1 style={{textAlign:'center',padding:'20px',fontSize:'1.2rem'}}>Recherchez vous un(e) {user.activite} comme vous ? </h1>
      
               <div class="searchBox">
 
            <input  id="search" class="searchInput"type="text" name="" placeholder="Recherche"   onChange={(e) => {
              e.target.value.length >= 1 && setSearch(e.target.value);
              setAll(true)
              e.target.value.reset()
            }} />
            <button class="searchButton" href="#">
                <i class="material-icons">
                    search
                </i>
            </button>
        </div>
        <br></br><br></br><br /><br></br><br /><br /><br />

         <div className="recherches">

      <div className="map">
        { all ? users.filter((el) => {
            if (
              el.activite
                  
                .toLocaleLowerCase()
                .includes(search.toLocaleLowerCase()) 
            ) {
              return true ;
          }
        

          
            
          
           
             
        })
          // .slice(0,20)
          .map((el, index) => {
            return (
                 
              
                   <NavLink key={el} to={`/user_profil/${el._id}`} >
                    
         <section>
    <div class="container">
    	<div class="row">
    	    
    		<div class="col-md-4">
    		    <div class="card profile-card-1">
    		        <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb" alt="profile-sample1" class="background"/>
    		        <img src={el.picture}  alt='picture' class="profile"/>
                    <div class="card-content">
                            <h2>{el.nom} {el.prenom}<small>{el.activite}</small></h2>
                             <p>Groupe de : {el.groupe}</p>
                    {/* <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div> */}
                    </div>
                </div>
            
        </div>
                        </div>
                      </div>
                      </section>
                </NavLink> 
             
               
            
            
            )
          }):
                <div>
                  
                <h1  style={{textAlign:'center',padding:'20px',fontSize:'1.2rem'}} >Quelques suggestions d'amis
                  que vous pouvez connaitre 
                  </h1>
                {
                  users.filter(el => {
                  if (el.activite === user.activite && el.groupe === user.groupe) {
                    return true
                  }
                }).slice(0,6)
                  .map((el, index) => {
                  return(
                 
                      <NavLink key={el} to={`/user_profil/${el._id}`} >
                    
         <section>
    <div class="container">
    	<div class="row">
    	    
    		<div class="col-md-4">
    		    <div class="card profile-card-1">
    		        <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb" alt="profile-sample1" class="background"/>
    		        <img src={el.picture}  alt='picture' class="profile"/>
                    <div class="card-content">
                                  <h2>{el.nom} {el.prenom}<small>{el.activite}</small></h2>
                                  <p>{el.groupe}</p>
                    {/* <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div> */}
                    </div>
                </div>
            
        </div>
                        </div>
                      </div>
                      </section>
                </NavLink> 
                  )
                })}
                </div>
                
            }
      </div>
      {/* <Footer/> */}
    </div>
        </div>
     
      
    );
};

export default Search;