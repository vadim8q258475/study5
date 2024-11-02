import Order from "../order/order";
import "./orders.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";
import get_data from "../../utils.js"
import EmptyPage from "../empty_page/empty_page.js";
import SETTINGS from "../../settings.js";
import utils from "../../utils.js";

const area = "orders";

function Orders() {
  const { promiseInProgress } = usePromiseTracker({ area });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    utils.getData(trackPromise, SETTINGS.ORDERS_URL, SETTINGS.TOKEN, setOrders)
  }, [setOrders]);

  if (orders.length == 0) {
    return <EmptyPage text='No orders'/>
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
            key={order.id}
            id={order.id}
          />
        ))}
      </div>
    );
  }
}

export default Orders;
