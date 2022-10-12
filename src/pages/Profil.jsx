import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import '../styles/pagesstyles/Form.scss';
import axios from 'axios';

import '../styles/pagesstyles/Profil.scss'
import Navbar from '../component/Navbar';
import Uploadimage from '../component/Uploadimage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setgetUsers,logOut } from '../features/user.reducers';

axios.defaults.withCredentials = true;


const Profil = ({id}) => {
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
//  console.log(users);
  return (
    <>
      {
        user && <div className="main-content">
        <Navbar />
        <br></br><br></br><br></br>
  
            <nav className="navbar navbar-top navbar-expand-md navbar-dark" id="navbar-main">
     
            </nav>
            {/* header */}
               <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center" >
    
      <span className="mask bg-gradient-default opacity-1"></span>
    
      <div className="container-fluid d-flex align-items-center">
        <div className="row">
          <div className="col-lg-7 col-md-10">
                  <h1 className="display-2 text-black">{user.nom} {user.prenom}</h1>
            <p className="text-black mt-0 mb-5">Deep social network est une plateforme web dédié au jeune professionnel de l'église biblique de la vie profonde. L'usage de ce site à caractère douteux est sanctionner par la suppression du compte définitivement.</p>
                
                
                {/* <div className="btn btn-sm btn-primary">
                    <Uploadimage/>

                </div>
                     */}
                
          </div>
        </div>
      </div>
            </div>
            
            {/* /page */}
         <div className="container-fluid mt--7">
      <div className="row">
        <div className="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div className="card card-profile shadow">
            <div className="row justify-content-center">
              <div className="col-lg-3 order-lg-2">
                <div className="card-profile-image">
                  <a href="#">
                    <img style={{borderRadius:"50%"}} width={180} height={180} src={user.picture} alt='picture_profil'></img>
                  </a>
                </div>
              </div>
            </div>
            <div className="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
              <div className="d-flex justify-content-between">
                {/* <a href="#" className="btn btn-sm btn-info mr-4">Connect</a>
                <a href="#" className="btn btn-sm btn-default float-right">Message</a> */}
                    
              </div>
            </div>
            <div className="card-body pt-0 pt-md-4">
              <div className="row">
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span style={{cursor:'pointer'}} onClick={()=>setfollowersPops(true)} className="heading">{user.followers.length}</span>
                            <span className="description" >Followers</span>
                        
                    </div>
                    <div>
                      <span style={{cursor:'pointer'}} onClick={()=>setfollowingPops(true)} className="heading">{user.following.length}</span>
                      <span className="description" >Following</span>
                    </div>
                    <div>
                      <span className="heading">89</span>
                      <span className="description">Post</span>
                    </div>
                  </div>
                </div>
                    </div>
                    
                    
                   {
                followersPopUp && 
                <div style={{position:"absolute",top:"0",background:'#0179C5'}} className='popUp'>
                  <h3 style={{textAlign:'center'}}>Abonnéés</h3>
                    <p style={{position:"absolute",top:"0",right:"0",display:'block',fontSize:"2rem",cursor:"pointer"}}  onClick={() => setfollowersPops(false)}><i class="fa-solid fa-xmark"></i></p>
                    <ul>
                      {
                        users.map((users) => {
                          for (let i = 0; i < user.followers.length; i++){
                            if (users._id === user.followers[i]) {
                              return (
                                <li style={{color:'white',width:'320px',lineHeight:'20px',boxShadow:"5px 7px 5px whitesmoke"}} key={users._id}>
                                  <img width={40} style={{marginLeft:'20px'}} src={users.picture} alt='picture' />
                                  <span style={{ marginLeft: '20px' }}>{users.nom}    {users.prenom}</span>
                                  <p style={{textAlign:'center'}}>{ users.activite}</p>
                                  <p style={{textAlign:'center'}}>{ users.groupe}</p>
                                  <h4>Follow handler</h4>
                                </li>
                              )
                            }
                          }
                        })
                      }
                   
                    </ul> 
                 </div>
                    } 
                       {
                followingPopUp && 
                <div style={{position:"absolute",top:"0",background:'#0179C5'}} className='popUp'>
                  <h3 style={{textAlign:'center'}}>Abonnement</h3>
                    <p style={{position:"absolute",top:"0",right:"0",display:'block',fontSize:"2rem",cursor:"pointer"}}  onClick={() => setfollowingPops(false)}><i class="fa-solid fa-xmark"></i></p>
                    <ul>
                      {
                        users.map((users) => {
                          for (let i = 0; i < user.following.length; i++){
                            if (users._id === user.following[i]) {
                              return (
                                <li style={{color:'white',width:'320px',lineHeight:'20px',boxShadow:"5px 7px 5px whitesmoke"}} key={users._id}>
                                  <img width={40} style={{marginLeft:'20px'}} src={users.picture} alt='picture' />
                                  <span style={{ marginLeft: '20px' }}>{users.nom}    {users.prenom}</span>
                                  <p style={{textAlign:'center'}}>{ users.activite}</p>
                                  <p style={{textAlign:'center'}}>{ users.groupe}</p>
                                  <h4>Follow handler</h4>
                                </li>
                              )
                            }
                          }
                        })
                      }
                   
                    </ul> 
                 </div>
                        } 
              <div className="text-center">
                <h3>
                 {user.nom} {user.prenom}
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"></i>Benin
                </div>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"></i>{user.activite} 
                </div>
                {/* <div>
                  <i className="ni education_hat mr-2"></i>University of Computer Science
                </div> */}
                <hr className="my-4"></hr>
                <p>L'église possedent des plateformes divers pour l'édification de l'ame.</p>
                <a href="#">consulter</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-8 order-xl-1">
          <div className="card bg-secondary shadow">
            <div className="card-header bg-white border-0">
              <div className="row align-items-center">
                <div className="col-8">
                  <h3 className="mb-0">Mon compte</h3>
                </div>
                <div className="col-4 text-right">
                       <NavLink to='/' className="btn btn-sm btn-secondary" onClick={handleLogOut} >Deconnceter</NavLink>
                      <br />
                       {/* {
                      handleClick ? <>
                          <NavLink to='/' className="btn btn-sm btn-secondary" onClick={handleLogOut} >Deconnceter</NavLink>
                          <br />
                           <a onClick={()=>handleDelete()} style={{backgroundColor:"red"}} href="#!" className="btn btn-sm btn-danger">Supprimer mon compte</a>
                      </> : null
                    } */}
                    </div>
                   
              </div>
            </div>
            <div className="card-body">
              <div>
                <h6 className="heading-small text-muted mb-4">Profil Information</h6>
                <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-username">Nom complet</label>
                        <p  id="input-username" className="form-control form-control-alternative"  >{user.nom} {user.prenom}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">Email</label>
                        <p id="input-email" className="form-control form-control-alternative" >{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                              <label className="form-control-label" for="input-first-name">Groupe</label>
                              <p type="text" id="input-first-name" className="form-control form-control-alternative" >{user.groupe}</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Activité</label>
                        <p  id="input-last-name" className="form-control form-control-alternative" >{user.activite} </p>
                      </div>
                          </div>
                              <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Contact Tel</label>
                        <p id="input-last-name" className="form-control form-control-alternative" > +229 {user.tel} </p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4"></hr>
                <h6 className="heading-small text-muted mb-4">Decrivez-vous en quelques lignes</h6>
                <div className="pl-lg-4">
                  <div className="form-group focused">
                          {/* {
                            upadateForm === false && (
                              <>
                                <p onClick={() => setUpdateForm(upadateForm)}>{user.bio}</p>
                                
                                <button onClick={() => setUpdateForm(upadateForm)}>Modifier bio</button>
                              </>
                            )
                          }
                          {
                            upadateForm && (
                              <>
                                <textarea type='text' defaultValue={user.bio} onChange={(e) => setBio(e.target.value)} ></textarea>
                                <button onClick={handleUpdate}>Valider modifications</button>
                              </>
                            )
                          } */}

                       
                  </div>
                </div>
                <h6 className="heading-small text-muted mb-4">Contactez les administrateurs du site</h6>
                {/* <div className="pl-lg-4">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-address">Email</label>
                        <p id="input-address" className="form-control form-control-alternative" placeholder="Home Address"  >vieprofondebenin@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-city">Tel:</label>
                        <input type="text" id="input-city" className="form-control form-control-alternative" placeholder="City" value="67919150" />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-country">Facebook</label>
                        <input type="text" id="input-country" className="form-control form-control-alternative" placeholder="Country" value="vie profonde benin" />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-control-label" for="input-country">Youtube</label>
                        <input type="text" id="input-postal-code" className="form-control form-control-alternative" placeholder="DCLM Français" />
                      </div>
                    </div>
                  </div>
                </div> */}
                <hr className="my-4"></hr>
                
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
            {/* footer */}
             {/* <footer className="footer">
    <div className="row align-items-center justify-content-xl-between">
      <div className="col-xl-6 m-auto text-center">
        <div className="copyright">
          <p>Made with <a href="https://www.creative-tim.com/product/argon-dashboard" target="_blank">Argon Dashboard</a> by Creative Tim</p>
        </div>
      </div>
    </div>
  </footer> */}
  </div>
      }
    </>
     
    
      
    );
};

export default Profil;