import "./App.css";
import Header from "./pages/Shared/Header/Header";
import Footer from "./pages/Shared/Footer/Footer";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Login from "./pages/Shared/Login/Login";
import Cart from "./pages/Cart/Cart";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/Shared/SignUp/SignUp";
import Shipping from "./pages/Shipping/Shipping";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Payment/Payment";

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/product/:id" element={<SingleProduct/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/shipping" element={<Shipping/>}></Route>
        <Route path="/checkout" element={<Checkout/>}></Route>
        <Route path="/payment/:id" element={<Payment></Payment>}></Route>
        
      </Routes>
      <Footer></Footer>
      <ToastContainer />
    </div>
  );
}

export default App;
