import React, { useRef, useState } from "react";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
const Login = () => {
  const emailref = useRef("");
  const passwordref = useRef("");
  const navigate = useNavigate();
  const handlelogin = async (e) => {
    e.preventDefault();
    const email = emailref.current.value;
    const password = passwordref.current.value;
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
  if (user) {
        console.log("successful", res.user);
        localStorage.setItem("uid", user.uid);
        navigate("/todo");
      }
    } catch (err) {
      console.error("error", err);
      alert(err);
    }
  };
  return (
    <div className="container">
          <h1 id="logintitle">login</h1>
          <form onSubmit={handlelogin}>
            <div className="insidelogin-reg-div">
              <div className="input-box">
              <input type="email" name="email" ref={emailref} placeholder="Enter your E-mail" required/>
              <MdEmail id="icon" />              
              </div>
              <div className="input-box">
              <input type="password" name="password" ref={passwordref} placeholder="password" required />
              <RiLockPasswordFill id="icon"/>
              </div>
              <div>
              <input type="submit" className="btn btn-success" id="submit" />
              </div>
            </div>
          </form>
          <div className="para">
            <p>Dont have an account ? <a href="/register">register here</a></p>       
          </div>

    </div>
  );
};

export default Login;
