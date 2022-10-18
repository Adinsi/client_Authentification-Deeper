import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, editPost } from '../features/post.reducers';
// import CardComments from './CardComments';
import LikeButton from './LikeButton';
// import LoadingPage from './LoadingPage';


// import { addComment, getAllPost } from '../features/post.reducers';
import { isempty,dateParser } from './Utils';

const ListPost = ({ el,key}) => {
  
    const [isLoading, setisloading] = useState(true);
      const [isUpdated,setisUpadated]= useState(false)
  const [textUpdated, setextUpadated] = useState(null);
  const [showComment, setShowComment] = useState(false)
  //  const[ text, setText ] = useState("");
    // const commenterId = el.posterId
    // const commenterPrenom = el.prenom 
    //  const commenterNom= el.nom 
    const users = useSelector((state)=> state.users.users)
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
//             const AddPostCommentRquest = async () => {
//  const res =  await axios
//             .patch(`${process.env.REACT_APP_URL_POST}${el._id}`,
                
//  {
 
//   commenterId ,
//   commenterNom ,
//   commenterPrenom ,
//      text,

//               }
//  ).catch(error => {
//    console.log(error)
//      ;

//             })
                
//     const data = await res.data;
//     return data;
 
//   }
    // const handlecomment = async (e) => {
    //     e.preventDefault();
    //     if (text) {
           
            
    //         AddPostCommentRquest()
    //                .then(() => {
    //                dispatch(addComment())
    //                // console.log(data);
    //                })
    //                .then(() => dispatch(getAllPost()))
    //                .then(() => setText(''))
    //     }
    // }
        const editRquest = async () => {
  await axios
            .put(`${process.env.REACT_APP_URL_POST}${el._id}`,
                
 {
 
  
  message : textUpdated
              }
 ).catch(error => {
   console.log(error)
     ;
  
  
            })
 
  }
         const deleteRquest = async () => {
  await axios
            .delete(`${process.env.REACT_APP_URL_POST}${el._id}`
                

 ).catch(error => {
   console.log(error)
     ;
  
  
            })
                
    
  }

    const updateItem =  () => {
    if (textUpdated) {
      editRquest().then(() => {
      dispatch(editPost())
    })
    }
  setisUpadated(false)
  }
   
  const deleteQuote = () => {
    deleteRquest().then(() => {
      dispatch(deletePost())
    })
  }
    useEffect(() => {
       isempty(users[0]) && setisloading(false)
    }, [users])

  

    return (
        <div>
         
            {
                isLoading ? (
 <div key={el._id} style={{margin:'40px 0'}} className="p-4 bg-light rounded shadow-sm">
              <img width={40} style={{ borderRadius: '50%' }} src={el.picture} alt='profil' />
              <span style={{ marginLeft: '15px' }}>{el.nom} {el.prenom} </span>

              <span style={{ position: "absolute", right: '0', marginTop: '15px' }}>{dateParser(el.createdAt)}</span>
                        <span style={{ marginLeft: '15px' }}>{el.activitePost} </span>
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
                    <div>
                          <div onClick={()=>setisUpadated(!isUpdated) }>

                                       <img style={{cursor:'pointer'}} src='./assets/edit.svg' alt='edit_svg' />
                                      
                    </div>
                      <div onClick={() => {
                        if (window.confirm('Voulez vous supprimez ce post ?')) {
                          // eslint-disable-next-line no-lone-blocks
                          {deleteQuote()}
                        }
                    }}>
 <img style={{cursor:'pointer'}} src='./assets/trash.svg' alt='edit_svg' />
                    </div>
                    </div>
                                  
                              
                                }
                                </div>
                          
                           
                        }
             
             
                        <ul style={{display:'flex',justifyContent:'space-around'}} className="list-inline small text-muted mt-3 mb-0">
                            <li style={{ cursor: 'pointer' }} className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>
                                <LikeButton el={el} /></li>
                <li style={{ cursor: 'pointer' }} className="list-inline-item">
                    <img onClick={()=>setShowComment(!showComment)} style={{cursor:'pointer'}} src='./assets/message1.svg' alt='message1_svg' />
                            </li>
                            <li style={{cursor:'pointer'}} className="list-inline-item"><i className="fa fa-heart-o mr-2"></i>Share</li>
              </ul>
            {/* {showComment  &&
            
                <div style={{ backgroundColor: 'blueviolet' }}>
                  
              <div className="comments-container">
      {el.comments.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === user._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="left-part">
              <img
                src={
                  !isempty(users[0]) &&
                  users
                    .map((user) => {
                      if (user._id === comment.commenterId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
          <div className="right-part">
            
            <p>{comment.commenterNom}</p>
                          <p>{comment.commenterPrenom}</p>
                           <p>{timestamParser(comment.timestamp)}</p>
                      <p>{ comment.text}</p>
            </div>
          </div>
        );
      })}
      {user._id && (
        <form action="" onSubmit={handlecomment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
              </div>
                
           } */}
                    </div>
                ):<h2>Chargement des publications....</h2>
            }
        </div>
    );
};

export default ListPost;