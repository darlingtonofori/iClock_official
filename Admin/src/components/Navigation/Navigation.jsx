import React from "react";
import "./Navigation.css";
import nav_logo from "../../assets/iClock.png";
import navProfile from "../../assets/profile.png";

const Navigation = () => {
  return (
    <div className="navbar">
      <img src={nav_logo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  );
};

export default Navigation;
