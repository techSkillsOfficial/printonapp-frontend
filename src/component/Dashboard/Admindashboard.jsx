import React from "react";
import { FiCreditCard, FiMail,FiBook, FiUser,FiBarChart, FiUsers } from "react-icons/fi";
import DashboardCard from "./DashboardCard";

const HoverDevCards = () => {
  return (
    <div className="p-4 min-h-screen">
      <p className="text-xl font-semibold mb-2">DashBoard</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Account"
          subtitle="Manage profile"
          href="#"
          Icon={FiUser}
        />
        <DashboardCard title="Order's" subtitle="Check your order status" href="/Admintable" Icon={FiBook} />
        {/* <DashboardCard title="Team" subtitle="Manage team" href="#" Icon={FiUsers} />
        <DashboardCard
          title="Billing"
          subtitle="Manage cards"
          href="#"
          Icon={FiCreditCard}
        /> */}
        
      </div>
    </div>
  );
};



export default HoverDevCards;
