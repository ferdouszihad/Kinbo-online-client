import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8000/api/product/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-6 text-end pe-5">
          <img src={product.img} alt="" />
        </div>
        <div className="col-md-6">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Category:{product.category}</p>
          <p>Price:{product.price}</p>
          <p>Quantity:{product.quantity}</p>
          <button type="button" className="btn btn-warning">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
