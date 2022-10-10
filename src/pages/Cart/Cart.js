import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
const Cart = () => {
  const [cart, setCart] = useState([]);
  const [remove, setRemove] = useState(true);

  useEffect(() => {
    const url = `http://localhost:8000/api/cart`;
    fetch(url, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => setCart(data));
  }, [remove]);

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

  const handleUpdate = async (event, _id) => {
    const i = cart.findIndex((item) => item._id === _id);
    const quantity = +event.target.value;
    const newCart = [...cart];
    newCart[i].quantity = quantity;

    setCart([...newCart]);
    console.log(_id, quantity);
    const url = `http://localhost:8000/api/cart/`;
    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": localStorage.getItem("token"),
      },
      body: JSON.stringify({ _id, quantity }),
    });
    // .then(res=>res.json())
    // .then(data => {
    //     console.log(data);
    // })

    const data = await res.json();
    if(data.status){
        toast.success(data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
    }
  };

  return (
    <div className="container text-center">
      <h2 className="my-5">Cart page</h2>
      {cart.length === 0 ? (
        <div>
          <img width="50%" src="https://i.ibb.co/C7c04cd/cart.jpg" alt="" />
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
                    {" "}
                    <img width="80" src={item.productId?.img} alt="" />
                  </th>
                  <td>{item.productId?.name}</td>
                  <td>{item.price}</td>
                  {/* <td>{item.quantity}</td> */}
                  <td>
                    <input
                      onChange={(event) => handleUpdate(event, item._id)}
                      type="number"
                      min="1"
                      max="5"
                    />
                  </td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleDeleteItem(item._id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Cart;
