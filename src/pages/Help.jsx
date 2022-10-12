import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from '../component/Navbar';

const Help = () => {
      const user = useSelector((state) => state.user.user);
  const users = useSelector((state) => state.users.users);
    return (
        <div>
            <Navbar />
            <br /><br /><br /><br />
            <h1>La famille s'agrandit nous sommes déja à {users.length} utilisateurs qui nous font confiance comme vous.</h1>
        </div>
    );
};

export default Help;