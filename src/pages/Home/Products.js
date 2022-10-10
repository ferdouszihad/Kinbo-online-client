import React, { useEffect, useState } from "react";
import Product from "./Product";

const Products = (props) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/product")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="row">
      {
      products.map((product) => (
        <Product  product={product} />
      ))
      }
    </div>
  );
};

export default Products;
