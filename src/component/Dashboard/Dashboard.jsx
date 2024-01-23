// Dashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <section>
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
            {/* Dashboard Logo */}
            {/* Replace 'DashboardLogo' with the actual logo component or image */}
            <img className="w-10 h-10" src="DashboardLogo" alt="Dashboard Logo" />
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Welcome to the Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Explore the features and manage your account.
          </p>
          <div className="mt-8">
            {/* Sample links, replace with actual dashboard links */}
            <Link
              to="/dashboard/profile"
              className="inline-block w-full bg-blue-500 text-white p-3 rounded-md font-semibold text-center hover:bg-blue-600 transition-all duration-200"
            >
              Profile
            </Link>
            <Link
              to="/dashboard/settings"
              className="mt-4 inline-block w-full bg-gray-500 text-white p-3 rounded-md font-semibold text-center hover:bg-gray-600 transition-all duration-200"
            >
              Settings
            </Link>
            {/* Add more dashboard links as needed */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
