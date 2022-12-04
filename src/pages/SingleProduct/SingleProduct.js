import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../Shared/PageTitle/PageTitle";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  const hadleAddToCart = () => {
    const { _id, price } = product;
    const url = `http://localhost:8000/api/cart`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        productId: _id,
        price: price,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        } else {
          toast.warn(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      });
  };
  return (
    <div className="container my-5">
      <PageTitle title="Product"></PageTitle>
      <div className="row">
        <div className="col-md-6 text-end pe-5">
          <img src={product.img} alt="" class="img-fluid" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Category:{product.category}</p>
          <p>Price:{product.price} Taka</p>
          <p>Quantity:{product.quantity}</p>
          <button
            type="button"
            className="btn btn-warning"
            onClick={hadleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
