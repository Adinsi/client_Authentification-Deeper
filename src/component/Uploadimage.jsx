import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUpload } from '../features/user.reducers';


import '../styles/componentstyles/upload.scss'
const Uploadimage = () => {
    const [files, setFiles] = useState();
    const dispatch = useDispatch();
    const user = useSelector((state)=> state.user.user)
const inputYear= useRef()
    const uploadPicture = (data,id) => {
        axios.post(
            'C', data
        ).then((res) => {
        //   dispatch(addUpload(data.user))
            return axios.get(`http://localhost:7500/api/user/${id}`).then((res) => {
                dispatch(data.user.picture)
            })
            .catch(err=>console.log(err))
        })

    }
    const handleSubmit = (e) => {
       
        const data = new FormData();
data.append('name',user.nom)
data.append('userId',user._id)
        data.append('file', files);
     
        axios.post(`http://localhost:7500/api/user/upload`, data).
            then(() => {

                dispatch(addUpload(data))
    console.log(data);
        })
    }
    return (
        <form className='formUpload' action=''onSubmit={handleSubmit}  method='post'>
            <label htmlFor='file'>
                Changer d'image
                <br></br>
                <input ref={inputYear} type='file' id='file' name='file' accept='.jpg, .jpeg, .png' onChange={(e)=>setFiles(e.target.value[0]) } />
            </label> 
            <br></br>
            <button type='submit'>Envoyer</button>
      </form>
    );
};

export default Uploadimage;