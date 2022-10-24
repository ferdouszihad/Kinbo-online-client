import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageTitle from "../Shared/PageTitle/PageTitle";

const Checkout = () => {
  const [data, setdata] = useState([]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/api/cart`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setdata(data);
        setUser(data[0].userId);
      });
  }, []);

  const handlePayment = () => {
    const url = `http://localhost:8000/api/order`;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          navigate(`/payment/${data._id}`);
        }
      });
  };

  return (
    <div className="container py-4 mt-3">
      <PageTitle title="Checkout"></PageTitle>
      <h2 className="text-center">Checkout page</h2>
      <div className="row mt-4 d-flex justify-content-center">
        <div className="col-md-5 shadow-sm p-3 mb-5 bg-body rounded me-4">
          <h4 className="py-2 mb-3 border-bottom">Shipping address</h4>
          <p>Name: {user.name}</p>
          <p>Phone: {user.phone}</p>
          <p>Address1: {user.address1}</p>
          <p>Address2: {user.address2}</p>
          <p>City: {user.city}</p>
          <p>State: {user.state}</p>
          <p>Zip: {user.zip}</p>
        </div>
        <div className="col-md-5 shadow-sm p-3 mb-5 bg-body rounded">
          <h4 className="py-2 mb-3 border-bottom">Cart info</h4>
          {data.map((item) => (
            <>
              <p>
                <span>{item?.productId.name}</span> X{" "}
                <span>{item.quantity}</span> ={" "}
                <span>{item.quantity * item.price}</span>
              </p>
            </>
          ))}
          <button onClick={handlePayment} className="btn btn-warning">
            Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
