import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";

import "firebase/storage"; // Import specific Firebase services if you need them

const firebaseConfig = {
  apiKey: "AIzaSyCFb7UzPMyjak_N8UNqxKPzQ43eBaj-i9s",
  authDomain: "issue-tracker-9b307.firebaseapp.com",
  projectId: "issue-tracker-9b307",
  storageBucket: "issue-tracker-9b307.appspot.com",
  messagingSenderId: "584654898170",
  appId: "1:584654898170:web:212e04b33bcb67084f1a43",
  measurementId: "G-38XF2R1QD0",
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
