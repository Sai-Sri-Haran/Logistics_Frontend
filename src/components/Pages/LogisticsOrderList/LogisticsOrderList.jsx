import React, { useState } from "react";
import Logistics from "../Logisticstxt/Logistics";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
function LogisticsOrderList() {
  let history = useHistory();
  const [temporders, settemporders] = useState({});
  const [orderlist, setorderlist] = useState(
    JSON.parse(localStorage.getItem("Order_details"))
  );
  const onChangeHandler = (id, status) => {
    temporders[id] = status;
  };
  const onSubmitHandler = async (id) => {
    console.log(temporders);
    const order_det = {
      order_id: id,
      status: temporders[id],
    };
    axios
      .post(`http://localhost:5000/api/v1/order`, { order_det })
      .then((res) => {
        console.log(res);
        if (res.data.status === "SUCCESS") {
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      });
  };
  const onClickhandler = async (e) => {
    axios.get(`http://localhost:5000/api/v1/vieworder/`).then((response) => {
      toast.info(response.data.message);
      localStorage.setItem("Order_details", JSON.stringify(response.data));
      console.log(orderlist.data);
      setTimeout(() => window.location.reload(), 3000);
    });
  };
  return (
    <div>
      <div className="nav-bar">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <button
            class="btn btn-outline-success"
            type="submit"
            onClick={() => {
              localStorage.clear();
              toast.dark("You are Logged Out");
              setTimeout(history.push("/login"), 7000);
            }}
            style={{ position: "relative", left: "95%" }}
          >
            Logout
          </button>
        </nav>
      </div>
      <div className="brand_name">
        <Logistics />
      </div>
      <div className="container">
        <Button variant="secondary" onClick={onClickhandler}>
          View Orders
        </Button>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>OrderID</th>
              <th>Email</th>
              <th>Current status</th>
              <th>Set Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orderlist.data.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_id}</td>
                <td>{order.email}</td>
                <td>{order.status}</td>
                <td>
                  <select
                    className="form-select"
                    onChange={(e) => {
                      onChangeHandler(order.order_id, e.target.value);
                    }}
                  >
                    <option value="Order Shipped">Order Shipped</option>
                    <option value="Order Delivered">Order Delivered</option>
                    <option value="Order Packed">Order Packed</option>
                    <option value="Returned">Returned</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => {
                      onSubmitHandler(order.order_id);
                    }}
                  >
                    Update Status
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default LogisticsOrderList;
