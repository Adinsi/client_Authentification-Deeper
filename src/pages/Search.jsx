/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Navbar from '../component/Navbar';
import '../styles/pagesstyles/search.scss'
import {  setgetUsers } from '../features/user.reducers';
import { setgetusers } from '../features/users.reducers';


const Search = () => {
    const [search, setSearch] = useState('');
    // const [users, setUsers] = useState([]);
  const [all, setAll] = useState(false)
 
  const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users.users);

     const dispatch = useDispatch();
    const sendRquest = async () => {
      const res = await axios
        .get("http://localhost:7500/api/user", {
          withCredentials: true,
        })
        // .catch((err) => console.log(err));
      const data = await res.data;
      return data;
    };

  const sendRquestUser = async () => {
    const res = await axios.get('http://localhost:7500/api/user/jwt', {
      withCredentials: true
    })
      // .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }
  useEffect(() => {
    sendRquestUser().then((data) => {
      dispatch(setgetUsers(data.user))
    });
  })

    useEffect(() => {
      sendRquest().then((data) => {
        dispatch(setgetusers(data));
        
      });
    });
    
//     const dispatch = useDispatch();
//    const users = useSelector((state)=>state.users.users);
    

    // console.log(users);
    return (
       
      <>
        {
          user &&   <div>
            <Navbar />
        <br /><br /><br /><br />
       <h1 style={{textAlign:'center',padding:'20px',fontSize:'1.2rem'}}>Recherchez vous un(e) {user.activite} comme vous ? </h1>
      
               <div className="searchBox">
 
            <input  id="search" className="searchInput"type="text" name="" placeholder="Recherche"   onChange={(e) => {
              e.target.value.length >=1 && setSearch(e.target.value);
              setAll(true)
             
            }} />
            <button className="searchButton" href="#">
                <i className="material-icons">
                    search
                </i>
            </button>
        </div>
        <br></br><br></br><br /><br></br><br /><br /><br />

         <div className="recherches">

      <div className="map">
        { all ? users.filter( el => {
            if (
              el.activite?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
            ) {
              return true ;
          }
        

          
            
          
           
             
        })
          
          .map((el) => {
            return (
                 
              
                   <NavLink key={el._id}  to={`/user_profil/${el._id}`} >
                    
         <section    >
    <div className="container">
    	<div className="row">
    	    
    		<div className="col-md-4">
    		    <div className="card profile-card-1">
    		        <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb" alt="profile-sample1" className="background"/>
    		        <img src={el.picture}  alt='picture_card' className="profile"/>
                    <div className="card-content">
                            <h2 >{el.nom} {el.prenom}<small>{el.activite}</small></h2>
                             <p>ville de : {el.ville}</p>
                    {/* <div className="icon-block"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"> <i className="fa fa-twitter"></i></a><a href="#"> <i className="fa fa-google-plus"></i></a></div> */}
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
                  // eslint-disable-next-line array-callback-return
                  users.filter((el) => {
                    
                    
             if (  el.activite?.toLocaleLowerCase().includes(user.activite?.toLocaleLowerCase()) && el.ville?.toLocaleLowerCase().includes(user.ville?.toLocaleLowerCase())) {
                    return true
                  }
                  }).slice(0, 6)
                    
                  .map((el) => {
                  return(
                 
                      <NavLink key={el._id} to={`/user_profil/${el._id}`} >
                    
         <section  >
    <div className="container">
    	<div className="row">
    	    
    		<div className="col-md-4">
    		    <div className="card profile-card-1">
    		        <img src="https://images.pexels.com/photos/946351/pexels-photo-946351.jpeg?w=500&h=650&auto=compress&cs=tinysrgb" alt="profile-sample1" className="background"/>
    		        <img src={el.picture}  alt='picture' className="profile"/>
                    <div className="card-content">
                                  <h2>{el.nom} {el.prenom}<small>{el.activite}</small></h2>
                                  <p>{el.ville}</p>
                    {/* <div className="icon-block"><a href="#"><i className="fa fa-facebook"></i></a><a href="#"> <i className="fa fa-twitter"></i></a><a href="#"> <i className="fa fa-google-plus"></i></a></div> */}
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
        }
      </>
     
      
    );
};

export default Search;