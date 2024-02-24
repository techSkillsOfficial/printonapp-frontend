// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Thesis } from "../Products/Thesis/Thesis";
import { useNavigate } from "react-router-dom";
import { FiCreditCard, FiMail,FiBook, FiUser,FiBarChart, FiUsers } from "react-icons/fi";
import DashboardCard from "./DashboardCard";
import {
  BarChart,
  Wallet,
  Newspaper,
  BellRing,
  Paperclip,
  Brush,
  Wrench,
} from "lucide-react";


const Userashboard = () => {
  
  const navigate = useNavigate();
  // button onClick={()=>{navigate('/Usertable')}}
  return (
    <div className="p-4 min-h-screen">
      <p className="text-xl font-semibold mb-2">User Dashboard</p>
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Account"
          subtitle="Manage profile"
          href="#"
          Icon={FiUser}
        />
        <DashboardCard title="Order's" subtitle="Check your order status" href="/Usertable" Icon={FiBook} />
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

export default Userashboard;
