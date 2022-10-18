/* eslint-disable array-callback-return */
import React , { useEffect }  from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/pagesstyles/Form.scss';
import axios from 'axios';

import '../styles/pagesstyles/Profil2.scss'
import Navbar from '../component/Navbar';

import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, setgetUsers,logOut } from '../features/user.reducers';


import { dateParser } from '../component/Utils';
import FormPost from '../component/FormPost';


axios.defaults.withCredentials = true;
const Profil2 = () => {
   

  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  
  const posts = useSelector((state) => state.posts.posts);


      const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_URL_USER}${user._id}`).then(() => dispatch(deleteUser(user._id)));
    history('/')

  }

    
  const deleteQuote = () => {
    handleDelete()
  }



  const sendlogOutRequest = async () => {
    const res = await axios.post(`${process.env.REACT_APP_URL_USER}logout`, null, {
      withCredentials:true
    })
    if (res.status === 200) {
      return res
    }
    return new Error('Déconnexion échoué, reprenez svp')
  }
  const handleLogOut = () => {
    sendlogOutRequest().then(() => {
      dispatch(logOut());
      history('/')
})
   
  }
//   const refreshToken= async () => {
//   const res = await axios.get('http://localhost:7500/api/user/refresh', {
//       withCredentials: true
//   })
//     // .catch(err => console.log(err));
//     const data = await res.data;
//     return data;
// }
  const sendRquest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_USER}jwt`, {
      withCredentials: true
    })
      // .catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

  // const deletePoste = async () => {
  //   const res = await axios.delete(`${process.env.REACT_APP_URL_POST}${user._id}`, {
  //     withCredentials: true
  //   })
  //     // .catch(err => console.log(err));
  //   const data = await res.data;
  //   return data
  // }
//   const handleClickDeletePost = () => {
//     deletePoste().then((data) => {
//     // dispatch(deletePost(data))
//       // console.log(data)
//   })
// }
  //    const sendRquestPost = async () => {
  //   const res = await axios.get(`http://localhost:7500/api/post/${posts.userPostId}`, {
  //     withCredentials: true
  //   }).catch(err => console.log(err));
  //   const data = await res.data;
  //   return data;
  // }



    useEffect(() => {
      sendRquest().then((data) => {
        dispatch(setgetUsers(data.user))
      });

      // sendRquestPost().then((data)=>{
      //   dispatch(getUserPost(data))
      // })
      
    })
    
// console.log(user._id);
  
    return (


      <>
    
        {
          user &&
          <>
          <Navbar />
            <br></br>
            <div className="row py-5 px-4">
    <div className="col-xl-4 col-md-6 col-sm-10 mx-auto">

        <div className="bg-white shadow rounded overflow-hidden">
            <div style={{backgroundColor:'#0E1D34'}} className="px-4 pt-0 pb-4 ">
                <div className="media align-items-end profile-header">
                    {/* <div className="profile mr-3"><img src={user.picture} alt="..." width="130" className="rounded mb-2 img-thumbnail" /><a href="#" className="btn btn-dark btn-sm btn-block">Changer le profil</a></div> */}
                    <div className="media-body mb-5 text-white">
                        <h1 style={{fontSize:'1.8rem',color:'white'}} className="mt-0 mb-0">{user.nom} {user.prenom}</h1>
                        <p className="small mb-4"> <i className="fa fa-map-marker mr-2"></i>ville de : {user.ville}</p>
                    </div>
                </div>
            </div>

            <div className="bg-light p-4 d-flex justify-content-end text-center">
                {/* <ul className="list-inline mb-0">
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">241</h5><small className="text-muted"> <i className="fa fa-picture-o mr-1"></i>Posts</small>
                    </li>
                    <li className="list-inline-item">
                        <h5 className="font-weight-bold mb-0 d-block">84K</h5><small className="text-muted"> <i className="fa fa-user-circle-o mr-1"></i>Recherches</small>
                    </li>
                </ul> */}
            </div>

            <div className="py-4 px-4">
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <h5 style={{color:'red',cursor:'pointer'}} onClick={() => {
                        if (window.confirm('Voulez vous supprimez définitivement votre compte  ?')) {
                          // eslint-disable-next-line no-lone-blocks
                          {deleteQuote()}
                        }
                    }} className="mb-0">Supprimer son compte</h5><p className="btn btn-link text-muted" onClick={handleLogOut}>Deconnecter</p>
                </div>
                
                      <h5 className="mb-3">Mes posts</h5>
                    <FormPost/>
                    
                    {
                      // eslint-disable-next-line array-callback-return

                      posts.filter((el) => {
                        if (el.posterId === user._id) {
                          return true;
                        }
                      }).map((el) => {
                        return (
                           <div key={el._id} className="py-4">
                   
                  
                            <div key={el._id} style={{ margin: '40px 0' }} className="p-4 bg-light rounded shadow-sm">
                                  <ul style={{display:'flex',justifyContent:'space-around'}} className="list-inline small text-muted mt-3 mb-0">
                          
                           
                                <li style={{ cursor: 'pointer' }} className="list-inline-item">    <span s>{dateParser(el.createdAt)}</span>
                                </li>
                        </ul>
              <img width={40} style={{ borderRadius: '50%' }} src={el.picture} alt='profil' />
                              <span style={{ marginLeft: '15px' }}>{el.nom} {el.prenom} </span>
                              <p style={{backgroundColor:'black',color:'white'}}>{el.message}</p>

              {/* <span style={{ position: "absolute", right: '0', marginTop: '15px' }}>{dateParser(el.createdAt)}</span> */}
{/*           
                                    {isUpdated === false &&
                                <p className="font-italic mb-0">{el.message}</p>}
                              {isUpdated && (
                                <div>
                                  <textarea
                                    defaultValue={el.message}
                                    onChange={(e)=>setextUpadated(e.target.value)}
                                  />
                                  <div>
<button onClick={updateItem}>Valider modification</button>
                                    </div>
                                </div>
                              )}
                        {
                            
                            <div>
                                  {user._id === el.posterId &&
                                  
                                    <div onClick={()=>setisUpadated(!isUpdated) }>

                                       <img src='./assets/edit.svg' alt='edit_svg' />
                                    </div>
                                }
                                </div>
                          
                           
                        } */}
                         
             
                        {/* <ul style={{display:'flex',justifyContent:'space-around'}} className="list-inline small text-muted mt-3 mb-0">
                                <li style={{ cursor: 'pointer' }} className="list-inline-item"><i className="fa fa-heart-o mr-2">{}</i></li>
                                <li style={{ cursor: 'pointer' }} className="list-inline-item"><i className="fa fa-comment-o mr-2"></i>{}comments</li>
                                <li style={{ cursor: 'pointer' }} className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>Shareètt</li>
                                <LikeButton/>
                        </ul> */}
                    </div>
                </div>
                    )
                      })
                    }
                   
            </div>
        </div>

    </div>
</div>
          </>
}


      </>
    );
};

export default Profil2;