import React from 'react';
import tailwindConfig from '../../../tailwind.config';
import duck2 from '../../assets/duck2.png';  // Path to your duck2 logo

const AdminLogin = () => {
  return (
    <div className="bg-gradient-to-br from-yellow-200 to-current h-screen flex justify-center items-center relative ">
      
      <form className=" bg-gradient-to-br from-yellow-200 to-current p-6 w-2/3 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-md rounded-lg shadow-md">
        <img src={duck2} alt="Duck Logo" className='  w-8 '/> 
        <h3 className="mb-6 text-black capitalize font-semibold text-lg">Dashboard Login</h3>
        <div className="mb-6">
          <input type="email" name="email" className="w-full bg-gray-700 p-3 rounded outline-none placeholder-gray-500" placeholder="Enter e-mail"/>
        </div>
        <div className="mb-6">
          <input type="password" name="password" className="w-full bg-gray-700 p-3 rounded outline-none placeholder-gray-500" placeholder="Enter password"/>
        </div>
        <button className="w-full bg-green1 text-white p-3 rounded border-2 border-green1 hover:bg-transparent hover:text-green1 transition duration-200">Login</button>
      </form>
    </div>
  );
}

export default AdminLogin;
