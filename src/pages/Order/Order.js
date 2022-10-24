import React ,{useState,useEffect} from "react";
import PageTitle from "../../pages/Shared/PageTitle/PageTitle";
import "./Order.css";

const Order = () => {
  const [orders,setOrders] = useState([]);

  useEffect(()=>{
    const url = `http://localhost:8000/api/order/user-orders`;
     fetch(url,{
        headers:{
            Authorization:localStorage.getItem("token")
        }
     })
     .then(res=>res.json())
     .then(data => setOrders(data))
     
  },[])
  
  let d = new Date().toISOString().slice(0,10);
  console.log(d);
  
  return (
    <div className="container my-5">
      <PageTitle title="Order"></PageTitle>
      <h2 className="text-center">Order Details</h2>
      <div className="row my-4">
        <table className="table">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">OrderId</th>
              <th scope="col">PaymentId</th>
              <th scope="col">Amount</th>
              <th scope="col">Delivery</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {  
                orders.map((order,index) =>  
                <tr className={`${ d === order.createdAt?.slice(0,10) ? "bg-table":""}`}>
                    <td>{index + 1}</td>
                    <td>{order._id}</td>
                    <td>{order.transactionId ? order.transactionId : "No payment"}</td>
                    <td>{order.amount ? order.amount : "0"} tk</td>
                    <td>
                     {
                      order.delivery === "pending" ?
                      <p className="text-danger">pending</p>
                      :
                      <p className="text-primary">completed</p>
                     }
                    </td>
                    <td>{order.createdAt?.slice(0,10)}</td>
                  </tr> 
                  )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
