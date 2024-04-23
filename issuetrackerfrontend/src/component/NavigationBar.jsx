import React from "react";
import "../component/navbar.css";
import { Link } from "react-router-dom";

function NavigationBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-black mb-1">
      <div className="container-fluid">
        <Link className="navbar-brand text-white fs-4 fw-bold" to="/">
          IssueTracker.io
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default NavigationBar;
