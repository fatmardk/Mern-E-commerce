import Nav from "../../../components/home/Nav";
import Header from "../../../components/home/Header";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useUserLoginMutation } from "../../store/services/authService";
import { setUserToken } from "../../store/reducers/authReducer";
import { useForm } from "../../../hooks/Form";
import { showError } from "../../../utils/ShowError";

const Login = () => {
  const [errors, setErrors] = useState([]);
  const {state, onChange} = useForm({
    email: "",
    password: "",
  });
 

  const [loginUser, response] = useUserLoginMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    loginUser(state);
  };

  useEffect(() => {
    if (response.isError) {
      setErrors(response?.error?.data?.errors || []);
    }
  }, [response?.error?.data]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem("userToken", response?.data?.token);
      dispatch(setUserToken(response?.data?.token));
      navigate("/user");
    }
  }, [response.isSuccess, dispatch, navigate, response?.data?.token]);

  return (
    <div>
      <Nav />
      <div>
        <Header>
          <p>sign in</p>
        </Header>
        <div className="flex flex-wrap justify-end mr-10 sm:mr-2">
          <motion.div
            initial={{ opacity: 0, x: "-100vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-3/6 sm:w-8/12 md:w-2/3 p-6"
          >
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-lg -mt-52 border border-gray-200 p-5"
            >
              <h1 className="heading">sign in</h1>
              <div className="mb-4">
                <label htmlFor="email" className="form-label">
                  email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`form-input ${
                    showError(errors,"email")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Email..."
                  value={state.email}
                  onChange={onChange}
                />
                {showError(errors,"email") && (
                  <span className="error">{showError(errors,"email")}</span>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className={`form-input ${
                    showError(errors,"password")
                      ? "border-rose-600 bg-rose-50"
                      : "border-gray-300 bg-white"
                  }`}
                  placeholder="Password..."
                  value={state.password}
                  onChange={onChange}
                />
                {showError(errors,"password") && (
                  <span className="error">{showError(errors,"password")}</span>
                )}
              </div>

              <div className="mb-4">
                <input
                  type="submit"
                  value={`${response.isLoading ? "Loading..." : "sign in"}`}
                  className="btn btn-dark w-full"
                  disabled={response.isLoading}
                />
              </div>

              <div>
                <p>
                  Don't have an account?{" "}
                  <span className="capitalize font-medium text-lg text-black">
                    <Link to="/register">register</Link>
                  </span>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
