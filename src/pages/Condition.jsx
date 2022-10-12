import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from '../component/Navbar';

const Condition = () => {
    return (
        <div>
         
            <NavLink to='/' >   <i class="fa-solid fa-arrow-left"></i></NavLink>
     <h1>Nos politiques de confidentilité</h1>  
        </div>
    );
};

export default Condition;