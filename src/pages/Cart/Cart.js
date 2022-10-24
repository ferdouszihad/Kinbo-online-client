import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Cart.css";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [remove, setRemove] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:8000/api/cart`;
    fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        let sum = 0;
        data.forEach((item) => {
          sum = sum + item.price * item.quantity;
        });
        setTotal(sum);
      });
  }, [remove, total]);

  const handleDeleteItem = (id) => {
    const url = `http://localhost:8000/api/cart/${id}`;
    fetch(url, {
      method: "delete",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status) {
          toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          setRemove(!remove);
        }
      });
  };

  const handleUpdateItem = async (_id, action) => {
    const i = cart.findIndex((item) => item._id === _id);
    let cartItem = cart[i];
    if (action === "plus") {
      cartItem.quantity += 1;
    }
    if (cartItem.quantity > 1 && action === "minus") {
      cartItem.quantity -= 1;
    } 
   
    const url = `http://localhost:8000/api/cart/`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-type": "Application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id, cart: cart[i] }),
    });
    const data = await res.json();
    if (data.status) {
      setRemove(!remove);
    }
  };

  const handleShipping = () => {
    navigate("/shipping");
  };

  return (
    <div className="container text-center">
      <h2 className="my-5">Cart page</h2>
      {cart.length === 0 ? (
        <div>
          <img
            width="20%"
            src="https://i.ibb.co/g6YBRy9/shopping-cart.gif"
            alt=""
          />
        </div>
      ) : (
        <div className="mt-5">
          <table className="table">
            <thead className="table-dark">
              <tr>
                <th scope="col"></th>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Subtotal</th>
                <th scope="col"> </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr>
                  <th>
                    <img width="80" src={item.productId?.img} alt="" />
                  </th>
                  <td>{item.productId?.name}</td>
                  <td>{item.price} tk</td>
                  <td>
                    <button
                      className="btn border"
                      onClick={() => handleUpdateItem(item._id, "plus")}
                    >
                      +
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      className="btn border"
                      onClick={() => handleUpdateItem(item._id, "minus")}
                    >
                      -
                    </button>
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <FaTrash
                      className="delete-btn"
                      onClick={() => handleDeleteItem(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* cart total */}
      <div className="row my-5">
        <div className="col-md-4 ms-auto">
          <table class="table">
            <thead class="table-dark">
              <tr>
                <th colSpan={2}>Cart totals</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>SubTotal</td>
                <td>{total} tk</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{total} tk</td>
              </tr>
              <tr>
                <td colSpan={2}>
                  <button
                    onClick={handleShipping}
                    className="btn btn-warning w-100 mt-2"
                  >
                    Shipping
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
