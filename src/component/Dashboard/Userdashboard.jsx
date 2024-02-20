// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Thesis } from "../Products/Thesis/Thesis";
import { useNavigate } from 'react-router-dom';
import { BarChart, Wallet, Newspaper, BellRing, Paperclip, Brush, Wrench } from 'lucide-react'

const Userashboard = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* <!-- Left Section --> */}

    <aside className="flex h-screen w-64 flex-col overflow-y-auto border-r bg-white px-5 py-8">
      
      <div className="mt-3 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-sm font-semibold  text-gray-900">Order History</label>
            <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Newspaper className="h-5 w-5" aria-hidden="true" />
              <button onClick={()=>{}} className="mx-2 text-sm font-medium">Thesis and Dissertation</button>
            </a>
            {/* <a
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="#"
            >
              <Profile className="h-5 w-5 mr-2" />
            </a> */}
          </div>
        </nav>
      </div>
    </aside>
  


        <div className="order-1 md:order-1 w-full md:w-1/2 p-4">
          {/* <!-- Content for the left section goes here --> */}
          {/* <h1 className="text-lg font-semibold">Left Section</h1> */}
          <p className="mt-2 text-sm text-gray-600">
            {/* <Profile/> */}
          </p>
        </div>

        {/* <!-- Right Section --> */}
        <div className="order-2 md:order-2 w-full md:w-1/2 p-4">
          {/* <!-- Content for the right section goes here --> */}
          {/* <h1 className="text-lg font-semibold">Right Section</h1> */}
          <p className="mt-10 text-sm text-gray-600">
            <Thesis/>
          </p>
        </div>
      </div>
    </>
  );
};

export default Userashboard;
