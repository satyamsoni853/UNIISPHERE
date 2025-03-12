import React from "react";
import Unispherelogo from "./Unispherelogo.png";
import Connectandsuccess from "./Success.png";
import Background from "../Background/Background";
import "./UNIISPHERELOGO.css"; // Ensure CSS is imported

function UNIISPHERELOGO() {
  return (
    <div className="login-wrapper-1">
      <Background />

      {/* Left-side Unisphere Logo */}
      <img
        src={Unispherelogo}
        alt="Unisphere Logo-1"
        className="top-left-logo"
      />

      {/* Container for Title and Success Image */}
      <div className="login-container-1">
        <div>
          <h1 className="unisphere-title-container">
            <span className="u">U</span>
            <span className="n">N</span>
            <span className="i">I</span>
            <span className="i">I</span>
            <span className="s">S</span>
            <span className="p">P</span>
            <span className="h">H</span>
            <span className="e">E</span>
            <span className="r">R</span>
            <span className="e">E</span>
          </h1>
        </div>
        <div className="Success-1">
          <h3>
            <span>"Connect" </span>
            <span>"Collbrate"</span>
            <span>"Success"</span>
          </h3>
        </div>
      </div>
    </div>
  );
}

export default UNIISPHERELOGO;
