import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { dislikePost, likePost } from '../features/post.reducers';

const LikeButton = ({ el }) => {
  const [likes, setLikes] = useState(false);
  
    const dispatch = useDispatch();
   const user = useSelector(state => state.user.user);
    const posts = useSelector(state => state.posts.posts);
    // console.log(posts);

    const sendRquestPostLike = async () => {
 const res =  await axios
            .patch(`${process.env.REACT_APP_URL_POST}like-post/${user._id}`,
                
 {
 
   id: user._id,
   
   
              }
 ).catch(error => {
   console.log(error)
     ;

            })
                
    const data = await res.data;
    return data;
    }
    const sendRquestPostunLike = async () => {
 const res =  await axios
            .patch(`${process.env.REACT_APP_URL_POST}unlike-post/${user._id}`,
                
 {
 
   id: user._id,
   
   
              }
 ).catch(error => {
   console.log(error)
     ;

            })
                
    const data = await res.data;
    return data;
    }
    
    const like = () => {
    sendRquestPostLike().then((data) => {
      
        dispatch(likePost(data))
        setLikes(true);

         
      })
}
    const unlike = () => {
     sendRquestPostunLike().then((data) => {
      
        dispatch(dislikePost(data))
        setLikes(false);

         
      })
}

    
    useEffect(() => {
        if (el.likers.includes(user._id)) setLikes(true)
        
    },[user._id,el.likers,likes])
    return (
        <div>
            {
                user._id  === false && (

            <Popup
          trigger={<i className='fa fa-heart-o mr-2' ></i>}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
                </Popup>
                )
               
            }
            {user._id && likes === false && (
                <i className="fa-solid fa-heart" onClick={like} style={{ fontSize:'18px' }}></i>
                
            )}
            {user._id && likes === true && (
               <i className="fa-sharp fa-solid fa-heart" style={{color:'red',fontSize:'18px'}} onClick={unlike}></i>
            )}
        </div>
    );
};

export default LikeButton;