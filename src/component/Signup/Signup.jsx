import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import BrandLogo from "../../assets/printonapp.png";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../store/action/auth";
import { useDispatch, useSelector } from "react-redux";
import PopupComponent from "../popup/popup";
import axios from "axios";

export function Signup() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role:"USER",
    collegeId: "", // College Name will be selected from the dropdown
  });
  const [showPopup, setShowPopup] = useState(false);
  const signupStatus = useSelector((state) => state.auth.signupStatus);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const processedValue = name === 'collegeId' ? +value : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: processedValue,
    }));
    console.log(formData);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { confirmPassword, ...signupData } = formData;
    console.log("1111")
    // Call the signup action with signupData
    dispatch(signup(signupData, navigate));
    console.log("signupStatus",signupStatus)
    if(signupStatus){
      setShowPopup(true);
    }
  };
  const [colleges, setColleges] = useState([]);
  const [loadingColleges, setLoadingColleges] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await axios.get('https://printonapp-gacom.ondigitalocean.app/homepage/colleges');
        console.log("response.dataresponse.data",response.data)
        setColleges(response.data.data); // assuming the response is an array of colleges
      } catch (error) {
        console.error('Error fetching colleges:', error);
      } finally {
        setLoadingColleges(false);
      }
    };

    fetchColleges();
  }, []);
  const handleClosePopup = () => {
    setShowPopup(false);
    // Navigate to the "signin" route
    navigate("/signin");
  };
  
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            <img className="w-10 h-10" src={BrandLogo} alt="SVG Image" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-center text-base text-gray-600">
            Already have an account?{" "}
            <Link
              to="/signin"
              title=""
              className="font-medium text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="first_name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    First Name{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="First Name"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="last_name"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Last Name{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Last Name"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
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
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="phone"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Phone Number{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="tel"
                    placeholder="Phone Number"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="confirmPassword"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Confirm Password{" "}
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="confirmPassword"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="collegeId"
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    College Name{" "}
                  </label>
                </div>
                <div className="mt-2">
                <select
        name="collegeId"
        value={+formData.collegeId}
        onChange={handleInputChange}
        className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <option value="">Select College Name</option>
        {loadingColleges ? (
          <option value="" disabled>Loading Colleges...</option>
        ) : (
          colleges.map((college) => (
            
            <option key={college.id} value={college.id}>
              {college.collegeName}
            </option>
            
          ))
        )}
      </select>
                </div>
              </div> 
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {showPopup && <PopupComponent onClose={handleClosePopup } />}
   
    </section>
    
  );
}
