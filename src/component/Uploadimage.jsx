import React, { useState } from 'react';
import '../styles/componentstyles/upload.scss'
const Uploadimage = () => {
    const [files, setFiles] = useState();
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <form className='formUpload' action=''onSubmit={handleSubmit}  method='post'>
            <label htmlFor='file'>
                Changer d'image
                <br></br>
                <input type='file' id='file' name='file' accept='.jpg, .jpeg, .png' onChange={(e)=>setFiles(e.target.value[0]) } />
            </label> 
            <br></br>
            <button type='submit'>Envoyer</button>
      </form>
    );
};

export default Uploadimage;