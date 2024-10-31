import "./order.css";
import Product from "../product/product.js";

function Order(props) {
  return (
    <div className="order" key={props.key}>
      <div className="orderTitle">Order №{props.key}</div>
      <div className="orderContent">
        <div className="orderText">
          <div className="orderTextTitle">DeliveryType:</div>
          {props.delivery_type}
        </div>
        <div className="orderText">
          <div className="orderTextTitle">Status:</div>
          {props.status}
        </div>
        <div className="orderText">
          <div className="orderTextTitle">Address:</div>
          {props.address}
        </div>
        <div className="orderText">
          <div className="orderTextTitle">Total:</div>
          {props.total} $
        </div>
        <div className="orderTextTitle">Products:</div>
        <div className="orderProducts">
          {props.order_products.map((order_prod) => (
            <Product
              name={order_prod.product.name}
              price={order_prod.product.price}
              key={order_prod.product.id}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;