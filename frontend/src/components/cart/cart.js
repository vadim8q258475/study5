import CartProduct from "../cart_product/cart_product";
import "./cart.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import get_data from "../../utils.js";
import EmptyPage from "../empty_page/empty_page.js";


const cartArea = "cart";
const deliveryTypeArea = "deliveryTypes";
const cartApiUrl = "http://127.0.0.1:8000/accounts/cart";
const deliveryTypesApiUrl = "http://127.0.0.1:8000/accounts/delivery_types";
const token = localStorage.getItem("token")


function Cart() {
  const { cartPromiseInProgress } = usePromiseTracker({ cartArea });
  const { deliveryTypesPromiseInProgress } = usePromiseTracker({
    deliveryTypeArea,
  });
  const [cart, setCart] = useState(null);
  const [deliveryTypes, setDeliveryTypes] = useState([]);

  useEffect(() => {
    get_data(trackPromise, cartApiUrl, token, setCart);
    get_data(trackPromise, deliveryTypesApiUrl, token, setDeliveryTypes);
    console.log(cart);
    console.log(deliveryTypes);
  }, [setCart]);

  if (cartPromiseInProgress || deliveryTypesPromiseInProgress) {
    return <div>Подождите, данные загружаются!</div>;
  } else if (!cart || cart.products.length == 0) {
    return <EmptyPage text="No products in cart" />;
  } else {
    return (
      <div className="cart">
        <div className="pageTitle">CART</div>
        <div className="cartContainer">
          <div className="createOrder">
            <div className="cartContentTitle">Create order</div>
            <div className="cartText">
              <div className="cartTitle">Total:</div> {cart.total} $
            </div>
            <div className="cartText">
              <div className="cartTitle">Qty:</div> 23
            </div>
            <div className="cartText">
              <div className="cartTitle">Address:</div> <br></br>
              <textarea></textarea>
            </div>
            <div className="deliveryTypes">
              <div className="cartText">
                <div className="cartTitle">DeliveryType: </div>
              </div>
              <form>
                {deliveryTypes.map((deliveryType) => (
                  <div className="deliveryType">
                    <input type="radio" name="deliveryType" />
                    {deliveryType.name}
                  </div>
                ))}
              </form>
            </div>
            <div>
              <button className="createOrderBtn btnStyle">Create order</button>
            </div>
          </div>

          <div className="cartProducts">
            <div className="cartProductsTitle"> Cart products</div>
            <div className="cartProductsContainer"></div>
            {cart.products.map((cartProduct) => (
              <CartProduct
                name={cartProduct.product.name}
                price={cartProduct.product.price}
                key={cartProduct.product.id}
                qty={cartProduct.qty}
              ></CartProduct>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
