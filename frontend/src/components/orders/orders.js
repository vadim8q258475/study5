import Order from "../order/order";
import "./orders.css"


function Orders() {
    return (
      <div className="orders">
        <div className="pageTitle">ORDERS</div>
        <Order></Order>
        <Order></Order>
        <Order></Order>
      </div>
    );
  }


  export default Orders;