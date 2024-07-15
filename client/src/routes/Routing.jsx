import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import React from "react";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/admin-logo" element={<AdminLogin/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
