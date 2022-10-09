import React from "react";

const Product = (props) => {
  const name = props.product?.name;
  const description = props.product?.description;
  const img = props.product?.img;
  const price = props.product?.price;
  const quantity = props.product?.quantity;

  return (
    <div className="col-md-4 text-center my-2">
      <img src={img} alt="" />
      <h2 className="my-2">{name}</h2>
      <p>{description}</p>
      <p>price:{price}</p>
      <p>Quantity:{quantity}</p>
      <button type="button" className="btn btn-warning">
         Add to cart
      </button>
    </div>
  );
};

export default Product;
