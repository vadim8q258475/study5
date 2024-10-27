import Order from "../order/order";
import "./orders.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";

const area = "orders";
const apiUrl = "http://127.0.0.1:8000/accounts/orders";
const token = "048f016a3a1e9c783c23cc190e0eb9d2d391e929";

function Orders() {
  const { promiseInProgress } = usePromiseTracker({ area });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const instance = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Token ${token}` },
    });
    trackPromise(
      instance.get().then((resp) => {
        const orders = resp.data;
        setOrders(orders);
        console.log(resp.data);
      })
    );
  }, [setOrders]);

  if (orders.length == 0) {
    return <h1>No orders</h1>;
  } else if (promiseInProgress) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="orders">
        <div className="pageTitle">ORDERS</div>
        {orders.map((order) => (
          <Order
            order_products={order.products}
            delivery_type={order.delivery_type.name}
            status={order.status.name}
            address={order.address}
            total={order.total}
          />
        ))}
      </div>
    );
  }
}

export default Orders;
