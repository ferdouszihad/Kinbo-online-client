import React from "react";
import { Link } from "react-router-dom";
import { BsFillCartCheckFill } from "react-icons/bs";
import { HiUserCircle } from "react-icons/hi";
const Header = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container py-3">
          <Link className="navbar-brand" to="/">
            <img width="60" src="https://i.ibb.co/vVHC4x7/logo1.png" alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About
                </Link>
              </li>
            </ul>
            {/* header right*/}
            <div className="me-2">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item pt-1">
                  <Link to="/cart">
                    <BsFillCartCheckFill
                      style={{ fontSize: "30px" ,color:"#4D4D4E" }}
                    />
                  </Link>
                </li>
                <li className="nav-item pt-1 ms-2">
                  <Link to="/order">
                    <HiUserCircle
                      style={{ fontSize: "30px",color:"#4D4D4E" }}
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
