// Dashboard.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Profile } from "../Profile/Profile";
import { Thesis } from "../Products/Thesis/Thesis";
import { useNavigate } from "react-router-dom";
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
  return (
    <div className="grid sm:grid-cols-12 grid-cols-4  min-h-screen">
      <button onClick={()=>{navigate('/Usertable')}}>
      History
      </button>
    </div>
  );
};

export default Userashboard;
