import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import '../styles/pagesstyles/Form.scss';
import axios from 'axios';
import SignIn from '../component/SignIn';
import '../styles/pagesstyles/Profil.scss'
import Navbar from '../component/Navbar';
import Uploadimage from '../component/Uploadimage';
axios.defaults.withCredentials = true;
let firstRender = true;

const Profil = () => {

  const [user, setuser] = useState();
  const [handleClick,sethandleClickParametre] = useState(false);

  const handleClickParametre = () => {
    sethandleClickParametre(!handleClick) 
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
      setuser(data.user)
    })
      
    },[])
   
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
                  <h1 className="display-2 text-white">{user.nom} {user.prenom}</h1>
            <p className="text-white mt-0 mb-5">Deep social network est une plateforme web dédié au jeune professionnel de l'église biblique de la vie profonde. L'usage de ce site à caractère douteux est sanctionner par la suppression du compte définitivement.</p>
                
                
                <div className="btn btn-sm btn-primary">
                    <Uploadimage/>

                </div>
                    
                
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
                      <span className="heading">22</span>
                      <span className="description">Followers</span>
                    </div>
                    <div>
                      <span className="heading">10</span>
                      <span className="description">Following</span>
                    </div>
                    <div>
                      <span className="heading">89</span>
                      <span className="description">Post</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h3>
                  Adinsi Abdias
                </h3>
                <div className="h5 font-weight-300">
                  <i className="ni location_pin mr-2"></i>Benin
                </div>
                <div className="h5 mt-4">
                  <i className="ni business_briefcase-24 mr-2"></i>Devellopeur web Front-end
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
                      <a onClick={handleClickParametre} href="#!" className="btn btn-sm btn-primary">paramètres</a>
                      <br />
                       {
                      handleClick ? <>
                          <a href="#!" className="btn btn-sm btn-secondary">Deconnceter</a>
                          <br />
                           <a style={{backgroundColor:"red"}} href="#!" className="btn btn-sm btn-danger">Supprimer mon compte</a>
                      </> : null
                    }
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
                        <p  id="input-username" className="form-control form-control-alternative"  >Adinsi Abdias</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <label className="form-control-label" for="input-email">Email</label>
                        <p id="input-email" className="form-control form-control-alternative" >adinsiabdias@gmail.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-first-name">Groupe</label>
                        <p type="text" id="input-first-name" className="form-control form-control-alternative" >Groupe de Zogbo</p>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group focused">
                        <label className="form-control-label" for="input-last-name">Activité</label>
                        <p  id="input-last-name" className="form-control form-control-alternative" >Devellopeur web front-end</p>
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="my-4"></hr>
                <h6 className="heading-small text-muted mb-4">Description</h6>
                <div className="pl-lg-4">
                  <div className="form-group focused">
                    <label>Qui suis-je ?</label>
                    <textarea rows="4" className="form-control form-control-alternative" placeholder="A few words about you ...">Passionné par les métiers du dévelloppemnet web ....</textarea>
                  </div>
                </div>
                <h6 className="heading-small text-muted mb-4">Contactez les administrateurs du site</h6>
                <div className="pl-lg-4">
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
                </div>
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