import React from "react";
import { Nav,Navbar } from "react-bootstrap";
import "./Navwbar.css"
import Logistics from "../Logisticstxt/Logistics";
function Navwbar() {
  return (
    <div>
       
      <Navbar bg="light" expand="lg">
          <Nav className="mr-auto">
            <Navbar.Brand href="/login"style={{fontFamily:"'Iceland',cursive",fontSize:"2rem",color:"#e74561",fontStyle:"oblique"}}>Login</Navbar.Brand>
            <Navbar.Brand href="/register" style={{fontFamily:" 'Iceland',cursive",fontSize:"2rem",color:"#e74561",fontStyle:"oblique"}}>Signup</Navbar.Brand>
          </Nav>
      </Navbar>
      <Logistics/>
    </div>
  );
}

export default Navwbar;
