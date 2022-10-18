import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L2CogCzzWb5ebzSfSId9ulpBtV5mGSiaf2jfi5kXltfG99tKSWr8Zv0mvloAkUKLv4eSlduSha775AlIBvP0FtQ00T8a2XCEb"
);

const Payment = () => {
   const [order,setOrder] = useState([]);
   const {id} = useParams();
   useEffect(()=>{
      const url = `http://localhost:8000/api/order/${id}`;
      fetch(url,{
        headers:{
          'Authorization':localStorage.getItem('token')
        }
      })
      .then(res=>res.json())
      .then(data => {
        setOrder(data)
        console.log(data);
      })
   },[id])
   console.log(order);
  return (
    <div>
      <h2 className="text-center">Payment</h2>
      <div className="row py-4">
        <div className="col-md-3 mx-auto border p-4 bordered">
          <Elements stripe={stripePromise}>
            <CheckoutForm  order={order}/>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
