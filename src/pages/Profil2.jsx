import React , { useEffect, useState }  from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../styles/pagesstyles/Form.scss';
import axios from 'axios';

import '../styles/pagesstyles/Profil2.scss'
import Navbar from '../component/Navbar';
import Uploadimage from '../component/Uploadimage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setgetUsers,logOut } from '../features/user.reducers';

axios.defaults.withCredentials = true;
const Profil2 = () => {
     const [followingPopUp,setfollowingPops] = useState(false)
    const [followersPopUp,setfollowersPops] = useState(false)
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
    const users = useSelector((state) => state.users.users);
      const handleDelete = () => {
    axios.delete(`http://localhost:7500/api/user/${user._id}`).then(() => dispatch(deleteUser(user._id)));
    history('/')

  }

  const sendlogOutRequest = async () => {
    const res = await axios.post('http://localhost:7500/api/user/logout', null, {
      withCredentials:true
    })
    if (res.status === 200) {
      return res
    }
    return new Error('Déconnexion échoué, reprenez svp')
  }
  const handleLogOut = () => {
    sendlogOutRequest().then(() => {
  dispatch(logOut())
})
   
  }
  const refreshToken= async () => {
  const res = await axios.get('http://localhost:7500/api/user/refresh', {
      withCredentials: true
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
}
  const sendRquest = async () => {
    const res = await axios.get('http://localhost:7500/api/user/jwt', {
      withCredentials: true
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

    useEffect(() => {
         sendRquest().then((data) => {
      dispatch(setgetUsers(data.user)) 
    })
      
    })
    

    return (
        <>
            {
                user &&
                
                <div>
            <Navbar />
                        <br></br><br></br><br></br><br></br>
                        {
                            followersPopUp &&
                            <div style={{
                                position: 'fixed', zIndex: "1000", maxHeight: '200px',
                                overflow: 'scroll',width:'300px',backgroundColor:'#0179C5'
                            }} className="pop_up">
                            <div className="popup_container_first">
                                <h1>Abonnées</h1>
                                <i class="fa-solid fa-xmark" onClick={() => setfollowersPops(false)} ></i>

                            </div>
                            <div className="container_second">
                                
                                       
                                        {
                                            users.map((users) => {
      for (let i = 0; i < user.followers.length; i++){
                                                    return (
                                                        <div className="po">
                                                                <img width={40} src={users.picture} alt='' />
                                                        <h3>{users.nom} {users.prenom} </h3>
                                                    </div>
                                                        
                                                   )
                                                    
                                                }  
                                            })
                                        }
                        </div>
                        </div>
                        }
                          {
                            followingPopUp &&
                            <div style={{
                                position: 'fixed', zIndex: "1000", maxHeight: '200px',
                                overflow: 'scroll',width:'300px',backgroundColor:'#0179C5'
                            }} className="pop_up">
                            <div className="popup_container_first">
                                <h1>Abonnement</h1>
                                <i class="fa-solid fa-xmark" onClick={() => setfollowingPops(false)} ></i>

                            </div>
                            <div className="container_second">
                                
                                       
                                        {
                                            users.map((users) => {
      for (let i = 0; i < user.following.length; i++){
                                                    return (
                                                        <div className="po">
                                                                <img width={40} src={users.picture} alt='' />
                                                        <h3>{users.nom} {users.prenom} </h3>
                                                    </div>
                                                        
                                                   )
                                                    
                                                }  
                                            })
                                        }
                        </div>
                        </div>
                     }
    
            <div class="wrapper">
  <div class="profile-card js-profile-card">
    <div class="profile-card__img">
      <img src={user.picture} alt='profil_card' />
    </div>
                    
    <div class="profile-card__cnt js-profile-cnt">
      <div class="profile-card__name">{user.nom} {user.prenom}</div>
      <div class="profile-card__txt">{user.activite} du groupe de <strong>{user.groupe}</strong></div>
      <div class="profile-card-loc">
        <span class="profile-card-loc__icon">
         
        </span>

        <span class="profile-card-loc__txt">
          {user.email}, {user.tel}
        </span>
      </div>

      <div class="profile-card-inf">
        <div style={{cursor:'pointer'}} onClick={()=>setfollowersPops(true)} class="profile-card-inf__item">
          <div class="profile-card-inf__title">{user.followers.length}</div>
          <div  class="profile-card-inf__txt">Abonnées</div>
        </div>

        <div  style={{cursor:'pointer'}} onClick={()=>setfollowingPops(true)} class="profile-card-inf__item">
          <div class="profile-card-inf__title">{user.following.length}</div>
          <div class="profile-card-inf__txt">Abonnement</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">123</div>
          <div class="profile-card-inf__txt">Articles</div>
        </div>

        <div class="profile-card-inf__item">
          <div class="profile-card-inf__title">85</div>
          <div class="profile-card-inf__txt">Works</div>
        </div>
      </div>


      <div class="profile-card-ctr">
        <NavLink class="profile-card__button button--blue js-message-btn" to='/' onClick={handleLogOut} >Deconnceter</NavLink>
        {/* <button class="profile-card__button button--orange">Follow</button> */}
      </div>
    </div>

  
  </div>

</div>


        </div>
            }
        </>
    );
};

export default Profil2;