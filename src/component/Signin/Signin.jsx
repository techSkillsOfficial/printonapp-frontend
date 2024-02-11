import React, { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import BrandLogo from '../../assets/printonapp.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/action/auth.js';
import Loader from '../Loader/Loader.jsx';
import PopupComponent from '../popup/popup.jsx';

export function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.auth.loading);
  const error=useSelector((state) => state.auth.error);
  const [showerrorpopup,setshowerrorpopup]=useState(false);
  console.log("error",error)
  const [validationErrors, setValidationErrors] = useState({
    email: '',
    password: '',
  });
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  useEffect(() => {
    const errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      errors.email = '';
    }

    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else {
      errors.password = '';
    }

    setValidationErrors(errors);
  }, [formData, touched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("error?.response?.data",error?.response?.data)
    if (!validationErrors.email && !validationErrors.password) {
      dispatch(login(formData, navigate));
    }

    if(error){
      setshowerrorpopup(true);
    }
  };
  const handleerrorPopup = () => {
    setshowerrorpopup(false);
    
  };

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img className="w-10 h-10" src={BrandLogo} alt="SVG Image" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              title=""
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Email address{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  ></input>
                  {validationErrors.email && (
                    <p className="text-red-500">{validationErrors.email}</p>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                  ></input>
                  {validationErrors.password && (
                    <p className="text-red-500">{validationErrors.password}</p>
                  )}
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isLoading&&<Loader/>}
      {showerrorpopup&& <PopupComponent onClose={handleerrorPopup} isSuccess={false} message={error?.response?.data?.error} />}

    </section>
  );
}
