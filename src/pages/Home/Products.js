import React, { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Product from "./Product";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return (
      <div className="d-flex justify-content-center">
        <ReactLoading
          type={"bubbles"}
          color={"#FFCA2C"}
          height={"15%"}
          width={"15%"}
        ></ReactLoading>
      </div>
    );
  }
  return (
    <div className="row row-cols-1 row-cols-md-3 g-5 my-5">
      {products.map((product) => (
        <Product product={product} />
      ))}
    </div>
  );
};

export default Products;
