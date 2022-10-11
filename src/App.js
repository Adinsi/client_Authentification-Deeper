import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ForgotPassword from "./component/ForgotPassword";
import ResetPassword from "./component/ResetPassword";
import Form from "./pages/Form";
import Help from "./pages/Help";
import Home from "./pages/Home";
import Profil from "./pages/Profil";
import Search from "./pages/Search";

import Condition from "./pages/Condition";
import UserProfil from "./pages/UserProfil";




const App = () => {
  return (
    <>
 
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<Form />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/help" element={<Help />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route
              path="/resetpassword/activate/:id"
              element={<ResetPassword />}
            />
            <Route
              path="/condition_generale"
              element={<Condition />}
            />
    
            <Route
              path="/user_profil/:id"
              element={<UserProfil />}
            />
          </Routes>
        </BrowserRouter>

    </>
  );
};

export default App;
