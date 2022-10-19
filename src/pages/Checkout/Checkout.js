import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="container">
      <h2 className="text-center">This check out page</h2>
      <div className="row mt-2">
        <div className="col-md-6">
          <h2 className="my-2">shipping Address</h2>
          <h5>Name:{user.name}</h5>
          <p>Address1:{user.address1}</p>
          <p>Address2:{user.address2}</p>
          <p>City:{user.city}</p>
          <p>State:{user.state}</p>
          <p>Zip:{user.zip}</p>
        </div>
        <div className="col-md-6">
          <h2>Cart Info</h2>
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
