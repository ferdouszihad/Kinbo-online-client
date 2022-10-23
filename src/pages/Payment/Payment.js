import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import stripe from "../images/stripe.png";

const stripePromise = loadStripe(
  "pk_test_51L2CogCzzWb5ebzSfSId9ulpBtV5mGSiaf2jfi5kXltfG99tKSWr8Zv0mvloAkUKLv4eSlduSha775AlIBvP0FtQ00T8a2XCEb"
);

const Payment = () => {
  const [order, setOrder] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const url = `http://localhost:8000/api/order/${id}`;
    fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setOrder(data);
      });
  }, [id]);

  return (
    <div className="container p-5">
      <div className="text-center">
        <img className="animate__animated animate__bounce" src={stripe} alt="" />
      </div>
      <div className="row py-4">
        <div className="col-md-5 mx-auto shadow-lg p-4  mb-5 bg-body rounded">
          <Elements stripe={stripePromise}>
            <CheckoutForm order={{...order,orderId:id}} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
