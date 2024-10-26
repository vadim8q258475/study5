import "./order.css"
import Product from "../product/product.js"


function Order() {
    return (
      <div className="order">
        <div className="orderTitle">Order №4958</div>
        <div className="orderContent">
            <div className="orderText"><div className="orderTextTitle">DeliveryType:</div> Delivery CDEK</div>
            <div className="orderText"><div className="orderTextTitle">Status:</div> In delivery</div>
            <div className="orderText"><div className="orderTextTitle">Address:</div> st. Pushkina h. Rolotushkina 68</div>
            <div className="orderText"><div className="orderTextTitle">Total:</div> 23 900 $</div>
            <div className="orderTextTitle">Products:</div>
            <div className="orderProducts">
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
                <Product></Product>
            </div>
        </div>
      </div>
    );
  }


  export default Order;