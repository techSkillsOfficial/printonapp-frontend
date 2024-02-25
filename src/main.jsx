import React from "react";
import ReactDOM from "react-dom/client";
import Layout from "./Layout.jsx";
import "./index.css";
import {
  Signin,
  Signup,
  Home,
  About,
  Contact,
  Userdashboard,
  Thesisform,
  Admindashboard,
  Usertable,
  Order,
  Admintable,
} from "./component/index.js";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store from "./store/store.js";
import PrivateRoute from "./privateroute.jsx";
//import Admindashboard from "./component/Dashboard/Admindashboard.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="signin" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="contact" element={<Contact />} />
      <Route path="Usertable" element={<Usertable />}/>
      <Route path="Admintable" element={<Admintable />}/>
      <Route path="Userdashboard" element={<PrivateRoute Component ={Userdashboard} />} />
      <Route path="Admindashboard" element={<PrivateRoute Component ={Admindashboard} />} />
      <Route path="thesisform" element={<PrivateRoute Component ={Thesisform} />} />
      {/* </Route> */}
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
