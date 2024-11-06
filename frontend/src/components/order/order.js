import "./order.css";
import Product from "../product/product.js";
import SETTINGS from "../../settings.js";

function Order(props) {
  return (
    <div className="order" key={props.key}>
      <div className="orderTitle">Order №{props.id}</div>
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
              product={order_prod.product}
              img={`${SETTINGS.BASE_URL}/${order_prod.product.img}`}
              key={order_prod.id}
            ></Product>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
