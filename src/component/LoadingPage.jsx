import React from 'react';
import LoadingGif from '../img/loading.gif';
import '../styles/componentstyles/load.scss';

const LoadingPage = () => {
    return (
        <div>
            <img className='loader' src={LoadingGif}  alt='image_de_chargement' />
        </div>
    );
};

export default LoadingPage;