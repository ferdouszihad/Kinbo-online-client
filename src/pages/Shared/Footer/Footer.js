import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer py-5 mt-3">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="text-bold mb-3">Contact Us</h5>
            <p>Call us 24/7</p>
            <h3>+8801818857587</h3>
            <p>Dhaka,Bangladesh</p>
          </div>
          <div className="col-md-4">
            <h5 className="mb-3">Quick Links</h5>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <div class="mb-3">
              <label class="form-label">Email address</label>
              <div className="d-flex">
                <input
                  type="email"
                  class="form-control"
                  id="exampleFormControlInput1"
                  placeholder=""
                />
                <button className="btn btn-warning ms-2">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
