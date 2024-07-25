import Nav from "../../../components/home/Nav";
import Header from "../../../components/home/Header";
import { Link,useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUserRegisterMutation } from "../../store/services/authService";
import {setUserToken} from "../../store/reducers/authReducer"
import {setSuccess} from "../../store/reducers/globalReducer"
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";

const Register = () => {
  const [errors, setErrors] = useState([]);

  const {state,onChange} = useForm({
    name: '',
    email:'',
    password:''
  })

  const [registerUser, response] = useUserRegisterMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(state);
    registerUser(state);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors || []);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if(response.isSuccess){
      localStorage.setItem('userToken', response?.data?.token)
      dispatch(setUserToken(response?.data?.token))
      dispatch(setSuccess(response?.data?.msg))
      navigate('/user')
    }
  },[response.isSuccess])



  return (
    <div>
      <Nav />
      <div>
        <Header>
          <p>Register</p>
        </Header>
        <motion.div
          initial={{ opacity: 0, x: "-100vw" }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-wrap justify-end mr-10 sm:mr-4"
        >
          <div className="lg:w-3/6 sm:w-8/12 md:w-2/3 p-6">
            <form onSubmit={onSubmit} className="bg-white rounded-lg -mt-72 border border-gray-200 p-10">
              <h1 className="heading">Register</h1>
              <div className="mb-4">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className={`form-input ${showError(errors,'name') ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}
                  placeholder="Name..."
                  value={state.name}
                  onChange={onChange}
                />
                {showError(errors,'name') && <span className="text-red-600">{showError(errors,'name')}</span>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${showError(errors,'email') ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}
                  placeholder="Email..."
                  value={state.email}
                  onChange={onChange}
                />
                {showError(errors,'email') && <span className="text-red-600">{showError(errors,'email')}</span>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${showError(errors,'password') ? 'border-rose-600 bg-rose-50' : 'border-gray-300'}`}
                  placeholder="Password..."
                  value={state.password}
                  onChange={onChange}
                />
                {showError(errors,'password') && <span className="text-red-600">{showError(errors,'password')}</span>}
              </div>

              <div className="mb-4">
                <input type="submit" value={`${response.isLoading ? 'Loading...' : 'sign up'}`} className="btn btn-dark w-full" disabled={response.isLoading ? true : false}/>
              </div>

              <div>
                <p>Already have an account? <span className="capitalize font-medium text-lg text-black"><Link to="/login">Login</Link></span></p>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
