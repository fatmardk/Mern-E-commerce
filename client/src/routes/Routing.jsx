import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import React from "react";
import Products from "../screens/dashboard/Products";
import Private from "./Private";
import Public from "./Public";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/admin-login" element={<Public><AdminLogin /></Public>} />
        <Route path="/dashboard/products" element={<Private><Products /></Private>} />
        <Route path="/dashboard/categories" element={<Private><Categories /></Private>} />
        <Route path="/dashboard/categories/:page" element={<Private><Categories /></Private>} />
        <Route path="/dashboard/create-category" element={<Private><CreateCategory /></Private>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
