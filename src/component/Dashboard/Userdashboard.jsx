// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Thesis } from "../Products/Thesis/Thesis";

const Userashboard = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* <!-- Left Section --> */}
        <div className="order-1 md:order-1 w-full md:w-1/2 p-4">
          {/* <!-- Content for the left section goes here --> */}
          {/* <h1 className="text-lg font-semibold">Left Section</h1> */}
          <p className="mt-2 text-sm text-gray-600">
            <Profile/>
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
