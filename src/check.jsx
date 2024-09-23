// src/CheckFirebaseConnection.js
import React, { useState, useEffect } from "react";
import { auth, signInAnonymously } from "./firebase"; // Import Firebase Auth from firebase.js

function CheckFirebaseConnection() {
  const [status, setStatus] = useState("Connecting...");

  useEffect(() => {
    // Attempt to sign in anonymously
    signInAnonymously(auth)
      .then(() => {
        setStatus("Firebase is connected successfully!");
      })
      .catch((error) => {
        setStatus(`Firebase connection failed: ${error.message}`);
      });
  }, []);

  return (
    <div>
      <h1>Firebase Connection Test</h1>
      <p>{status}</p>
    </div>
  );
}

export default CheckFirebaseConnection;
