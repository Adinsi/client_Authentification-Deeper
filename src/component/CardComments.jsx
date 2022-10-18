import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, getAllPost } from '../features/post.reducers';
import { isempty, timestamParser } from './Utils';

const CardComments = ({ el }) => {
        const users = useSelector((state)=> state.users.users)
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);
    const posts = useSelector((state) => state.posts.posts);
    const[ text, setText ] = useState("");
    const commenterId = el.posterId
    const commenterPrenom = el.prenom 
     const commenterNom= el.nom 
    console.log();
            const AddPostCommentRquest = async () => {
 const res =  await axios
            .patch(`${process.env.REACT_APP_URL_POST}comment-post/${el._id}`,
                
 {
 
  commenterId ,
  commenterNom ,
  commenterPrenom ,
     text,

              }
 ).catch(error => {
   console.log(error)
     ;

            })
                
    const data = await res.data;
    return data;
 
  }
    const handlecomment = async (e) => {
        e.preventDefault();
        if (text) {
           
            
            AddPostCommentRquest()
                   .then(() => {
                   dispatch(addComment())
                   // console.log(data);
                   })
                   .then(() => dispatch(getAllPost()))
                   .then(() => setText(''))
        }
    }
    return (
    //     <div>
    //         {el.comments.map((comment) => {
    //             return (
    //                 <div className={comment.commenterId===user._id? "commentsPerso":"commentsNormal"} key={comment._id} >
                        
    //                     <div>
    //                         <img src={!isempty(users[0]) && users.map((user) => {
    // if(user._id === comment.posterId) return user.picture
    //                         }).join("")} alt='commenter-pic' />
    //                         <p>{comment.commenterNom}</p>
    //                         <p>{comment.commenterPrenom}</p>
    //                         <p>{timestamParser(comment.timestamp)}</p>
    //                     <p>{ comment.text}</p>
    //                     </div>
    //                </div>
    //            )
    //         })
            
    //         }
    //         {
    //             user._id && (
    //                 <form method='patch' onSubmit={handlecomment}>
    //                     <input type='text' name='text' onChange={(e) => {
    //                         setText(e.target.value)
    //                     }} value={text} placeholder='Laisser un commentaire' />
    //                     <br></br>
    //                     <input style={{cursor:'pointer'}} type='submit' value='Envoyer' />

    //                 </form>
    //             )
    //         }
    //     </div>

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
    )
}

    ;

export default CardComments;