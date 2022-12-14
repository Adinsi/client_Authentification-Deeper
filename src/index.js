import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import './styles/_seetings.scss';
import { Provider } from 'react-redux';
import store  from './app/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(  
    
<Provider store={store}>
    
    <App />
    
</Provider>
 

);
