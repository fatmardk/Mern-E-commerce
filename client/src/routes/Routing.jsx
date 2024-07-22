import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "../screens/auth/AdminLogin";
import React from "react";
import Products from "../screens/dashboard/Products";
import Private from "./Private";
import Public from "./Public";
import Categories from "../screens/dashboard/Categories";
import CreateCategory from "../screens/dashboard/CreateCategory";
import UpdateCategory from "../screens/dashboard/UpdateCategory";
import CreateProduct from "../screens/dashboard/CreateProduct";
import EditProduct from "../screens/dashboard/EditProduct"
import Home from "../screens/home/Home"
import Login from "../screens/home/auth/Login";
import Register from "../screens/home/auth/Register";
import Dashboard from "../screens/users/Dashboard";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="/user" element={<Dashboard/>}/>
        <Route path="/auth/admin-login" element={<Public><AdminLogin /></Public>} />
        
        <Route path="/dashboard/products" element={<Private><Products /></Private>} />

        <Route path="/dashboard/products/:page" element={<Private><Products /></Private>} />

        <Route path="/dashboard/update-product/:id" element={<Private><EditProduct /></Private>} />
        
        <Route path="/dashboard/categories" element={<Private><Categories /></Private>} />
        
        <Route path="/dashboard/categories/:page" element={<Private><Categories /></Private>} />
        
        <Route path="/dashboard/create-category" element={<Private><CreateCategory /></Private>} />
        
        <Route path="/dashboard/update-category/:id" element={<Private><UpdateCategory /></Private>} />

        <Route path="/dashboard/create-product" element={<Private><CreateProduct /></Private>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
