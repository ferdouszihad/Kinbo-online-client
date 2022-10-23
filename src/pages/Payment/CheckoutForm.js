import React, { useEffect, useState } from "react";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const CheckoutForm = (props) => {
  const { amount, userId,orderId} = props.order;
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [success, setSuccess] = useState("");
  const [paymentId, setPaymentId] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8000/create-payment-intend`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ amount }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, [amount, props]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");

    //confirm card payment
    const { paymentIntent, error1 } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: card,
          billing_details: {
            name: userId.name,
            email: userId.email,
          },
        },
      }
    );

    if (error1) {
      setCardError(error1?.message);
    } else {
      setCardError("");
      setSuccess("Payment Completed!");
      setPaymentId(paymentIntent.id);
      //update payment info
      
      const url  = `http://localhost:8000/api/order/${orderId}`;

      const payment = {
        paid:true,
        transactionId:paymentIntent.id,
        userId:userId,
        amount:amount
      }

      fetch(url,{
        method:"PATCH",
        headers:{
          "Content-Type":"Application/json"
        },
        body:JSON.stringify(payment)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log("payment info",data);
      })
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-warning mt-4 mb-2"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-danger">{cardError}</p>}
      {success && <p className="text-primary">{success}</p>}
      {paymentId && <p className="text-primary">{paymentId}</p>}
    </div>
  );
};

export default CheckoutForm;
