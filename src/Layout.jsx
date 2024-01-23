import "./App.css";
import { Navbar,Footer } from "./component";
import { Outlet } from "react-router-dom";


function Layout() {
  return (
    <>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>   
    </>
  );
}

export default Layout;
