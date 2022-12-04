import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Product = (props) => {
  const { _id, name, description, img, price, quantity } = props.product;
  const navigate = useNavigate();

  const handleAddToCart = (id) => {
    const url = `http://localhost:8000/active`;
    fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          navigate(`/product/${id}`);
        } else {
          toast.warn(<Link to="/login">Please login</Link>, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };

  return (
    <div className=" text-center my-3">
      <img src={img} alt="" className="img-fluid" />
      <h3 className="my-2">{name}</h3>
      <p>{description}</p>
      <p>Price:{price} Taka</p>
      <p>Quantity:{quantity}</p>
      <button
        onClick={() => handleAddToCart(_id)}
        type="button"
        className="btn btn-warning"
      >
        View product
      </button>
    </div>
  );
};

export default Product;
