import React from "react";
import PageTitle from "../Shared/PageTitle/PageTitle";
import Products from "./Products";

const Home = (props) => {
  return (
    <div className="container">
      <PageTitle title="Home"/>
      <Products></Products>
    </div>
  );
};

export default Home;
