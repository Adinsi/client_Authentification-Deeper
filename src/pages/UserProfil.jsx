import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { dateParser } from '../component/Utils';
import '../styles/componentstyles//userProfile.scss';

const UserProfil = () => {
      const user = useSelector((state)=>state.user.user)
      const users = useSelector((state)=>state.users.users)
    const [data, setData] = useState([]);
  
        const href = window.location.href;
    const id = href.slice(34) 
   const sendRquest = async () => {
    const res = await axios.get(`http://localhost:7500/api/user/${id}`, {
      withCredentials: true
    })
      // .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

    useEffect(() => {
         sendRquest().then((data) => {
             setData((data));
            //  console.log(data)
    })
      
    })
  // console.log(user,users);

    return (
    
  <div id='userProfil'  className="grid-7 element-animation">
  
    <div className="card color-card">
      <ul>
      <NavLink to='/search'>  <li><i  className="fas fa-arrow-left i-l w"></i></li></NavLink>
  
      </ul>
                <img src={data.picture} alt="profilepic" className="profile" />
               <br></br>
                <h1 className="title">{data.nom} {data.prenom}</h1>
      <p className="job-title">{data.activite}</p>
      <div className="desc top">
                    <a href={`mailto:${data.email}`}>
                        
                        Adress Email : {data.email}</a>
                    <br/>
        <a href={`tel:${data.tel}`} >Contact mobile : {data.tel}</a>
        <p>ville de : {data.ville}</p>
                    <p>Membre dépuis le : {dateParser( data.createdAt)}</p>
      </div>
     
      <hr></hr>
      {/* <div className="container">
        <div className="content">
          <div className="grid-2">
            <button  className="color-b circule"> <i className="fab fa-dribbble fa-2x"></i></button>
                            <h2 className="title">{data.following ? data.following.length:""}</h2>
            <p className="followers">Abonnement</p>
          </div>
          <div className="grid-2">
            <button  className="color-c circule"><i className="fab fa-behance fa-2x"></i></button>
            <h2 className="title">{data.followers?data.followers.length:""}</h2>
            <p className="followers">Abonnées</p>
          </div>
          <div className="grid-2">
            <button className="color-d circule"><i className="fab fa-github-alt fa-2x"></i></button>
            <h2 className="title">17.8k</h2>
            <p className="followers">Followers</p>
              </div>
        
            
        </div>
      </div> */}
    </div>
  



  {/* <div className="grid-7 element-animation">
    <div className="card color-card-2">
      <ul>
        <li><i className="fas fa-arrow-left i-l b"></i></li>
        <li><i className="fas fa-ellipsis-v i-r b"></i></li>
        <li><i className="far fa-heart i-r b"></i></li>
      </ul>
      <img src="https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7d5363c18112a02ce22d0c46f8570147&auto=format&fit=crop&w=635&q=80%20635w" alt="profile-pic" className="profile" />
      <h1 className="title-2">Bevely Little</h1>
      <p className="job-title"> SENIOR PRODUCT DESIGNER</p>
      <div className="desc top">
        <p>Create usable interface and designs @GraphicSpark</p>
      </div>
      <button className="btn color-a top"> Hire me</button>

      <hr className="hr-2"></hr>
      <div className="container">
        <div className="content">
          <div className="grid-2">
            <button className="color-b circule"> <i className="fab fa-dribbble fa-2x"></i></button>
            <h2 className="title-2">12.3k</h2>
            <p className="followers">Followers</p>
          </div>
          <div className="grid-2">
            <button className="color-c circule"><i className="fab fa-behance fa-2x"></i></button>
            <h2 className="title-2">16k</h2>
            <p className="followers">Followers</p>
          </div>
          <div className="grid-2">
            <button className="color-d circule"><i className="fab fa-github-alt fa-2x"></i></button>
            <h2 className="title-2">17.8k</h2>
            <p className="followers">Followers</p>
          </div>
        </div>
      </div>
    </div>
  </div> */}
</div>

    );
};

export default UserProfil;