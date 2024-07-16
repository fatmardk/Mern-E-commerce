import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import React from "react";
import Products from "../screens/dashboard/Products";
import Private from "./Private";
import Public from "./Public";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/admin-login" element={<Public><AdminLogin /></Public>} />
        <Route path="/dashboard/products" element={<Private><Products /></Private>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
