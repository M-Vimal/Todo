import React from "react";
import { Link } from "react-router-dom";
import "../css/auth.css";

const Auth = () => {
  return (
    <div className="authdiv">
      <div className="sub-div">
          <h2 id="authheading">Remember to Forgot</h2>
        <div className="linkdiv">
          <Link to="/login">
            <button className="btn">Login</button>
          </Link>
        </div>
        <div className="linkdiv">
          <Link to="/register">
            <button className="btn">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
