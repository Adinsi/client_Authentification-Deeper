import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, getAllPost } from '../features/post.reducers';
import { dateParser } from './Utils';

const FormPost = () => {

 
    const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const posts = useSelector((state) => state.posts.posts);
  const users = useSelector((state) => state.users.users);
  const [message, setmessage] = useState('');
  const posterId = user._id;
  const nom = user.nom
  const prenom = user.prenom
  const activitePost = user.activite;
  const villePost = user.ville;
  // console.log(posterId,activitePost,villePost);
    const sendRquest = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_POST}`, {
      withCredentials: true
    }).catch(err => console.log(err));
    const data = await res.data;
    return data;
  }

     const sendRquestPost = async () => {
 const res =  await axios
            .post(`${process.env.REACT_APP_URL_POST}`,
                
 {
 
   posterId: posterId,
   nom: nom,
   prenom :prenom,
   activitePost:activitePost,
   villePost:villePost,
   message,
   likers: '',
   comments: '',
   
              }
 ).catch(error => {
   console.log(error)
     ;

            })
                
    const data = await res.data;
    return data;
}
    const handleSubmit = async (e) => {

    e.preventDefault();
    
 
      sendRquestPost().then((data) => {
      
        dispatch(addPost(data))

         
      })
        
        
      
  }
  useEffect(() => {
    sendRquest().then((data) => {
  dispatch(getAllPost(data))
    })
  })



    return (
        <div className="name">
           <div className="py-4">
              
            <div className="p-4 bg-light rounded shadow-sm">
              <img width={80} style={{ borderRadius: '100%',textAlign:'center',display:'block' }} src={user.picture} alt='profil' />
         
                    <form onSubmit={handleSubmit} method="post">
              <textarea required type='text' style={{  height:'140px',border: 'none' }} placeholder=' A quoi pensez vous ?' name="" id="" className="font-italic mb-0" onChange={(e) => setmessage(e.target.value)} ></textarea>
             
                        <ul style={{display:'flex',justifyContent:'space-around'}} className="list-inline small text-muted mt-3 mb-0">
                            <button type='submit'  style={{cursor:'pointer'}}  className="list-inline-item send"><i className="fa fa-comment-o mr-2 "></i>Envoyer</button>
                           
                        </ul>
            </form>
                    </div>
                </div>
        </div>
    );
};

export default FormPost;