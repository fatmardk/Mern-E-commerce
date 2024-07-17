import React, { useState, useEffect } from 'react';
import duck2 from '../../assets/duck2.png'; 
import { useAuthLoginMutation } from '../store/services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAdminToken } from '../store/reducers/authReducer';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState([]);
  const [login, response] = useAuthLoginMutation();
  const dispatch = useDispatch();

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const AdminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response.data.token);
      dispatch(setAdminToken(response.data.token));
      navigate('/dashboard/products');
    } else if (response.isError) {
      setErrors(response.error.data.errors || []);
      console.log(response.error);
    }
  }, [response, dispatch, navigate]);

  return (
    <div className="bg-darkgreen h-screen flex justify-center items-center relative">
      <form className="bg-white p-6 w-2/3 sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-md rounded-lg shadow-md" onSubmit={AdminLoginFunction}>
        <img src={duck2} alt="Duck Logo" className="w-8" />
        <h3 className="mb-6 text-darkgreen capitalize font-semibold text-lg">Dashboard Login</h3>
        {errors.length > 0 && errors.map((error, key) => (
          <div key={key}>
            <p className="alert-danger">{error.msg}</p>
          </div>
        ))}
        <div className="mb-6 mt-4">
          <input
            type="email"
            name="email"
            className="w-full bg-white border-2 border-black p-3 rounded outline-none placeholder-gray-500 text-black"
            onChange={handleInputs}
            value={state.email}
            placeholder="Enter e-mail"
          />
        </div>
        <div className="mb-6">
          <input
            type="password"
            name="password"
            className="w-full bg-white border-2 border-black p-3 rounded outline-none placeholder-gray-500 text-black"
            onChange={handleInputs}
            value={state.password}
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-darkgreen text-white p-3 rounded border-2 border-darkgreen hover:bg-white hover:text-darkgreen transition duration-300"
        >
          {response.isLoading ? 'Loading...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
