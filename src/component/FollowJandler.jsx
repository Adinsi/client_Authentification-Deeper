import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUser } from '../features/user.reducers';
import { isempty } from './Utils';

const FollowJandler = ({ idTofollow}) => {
    const dispatch = useDispatch();
    const usersData = useSelector((state) => state.users.users);
    // const user = useSelector((state) => state.user.user);
    const [isfollowin, setisfollowing] = useState(false);
 
      

      const sendlogOutRequestFollow = async () => {
          const res = await axios.patch(`${process.env.REACT_APP_URL_USER}follow/${usersData._id}`, 
              {
              data : {idTofollow}
          },    
          ).catch(err=> console.log(err))
          const data = res.data;
          return data
  
    }
    
      const sendlogOutRequestunFollow = async () => {
          const res = await axios.patch(`${process.env.REACT_APP_URL_USER}unfollow/${usersData._id}`, 
              {
              data : {idTofollow}
          },    
          ).catch(err=> console.log(err))
          const data = res.data;
          return data
  
  }
    const handleFollow = () => {
        sendlogOutRequestFollow().then((data) => {
            dispatch(followUser(data))
            setisfollowing(true)
        })
    }

     const unhandleFollow = (id) => {
        
    }
    useEffect(() => {
        if (!isempty(usersData.following)) {
            if (usersData.following.includes(idTofollow)) {
                setisfollowing(true)
            }
            else setisfollowing(false)
        }
    },[usersData,idTofollow])


    return (
        <>
            {
                isfollowin && isempty(usersData) &&  (

            <span onClick={unhandleFollow}>
                Abonnées
            </span>
                )
            }

            {
                isfollowin === false && isempty(usersData) &&  (
                     <span onClick={handleFollow}>
                suivre
            </span>
                )
            }
        </>
    );
};

export default FollowJandler;