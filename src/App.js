import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./pages/Form";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Search from "./pages/Search";




const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Form />} />
          <Route path="/profil" element={<Profil />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<Search/>} />
          <Route path="/help" element={<Help/>} />
        
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
