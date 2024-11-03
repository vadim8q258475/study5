import axios from "axios";
import Product from "../product/product";
import "./cart_product.css";
import utils from "../../utils";

const baseApiUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("token");

function removeFromCart(cartProductId, qty) {
  return () => {
    utils.sendData("accounts/cart", "delete", {
      data: { cart_product_id: cartProductId, qty: qty },
    });
  };
}

function changeQty(cartProductId, product, is_plus) {
  return () => {
    let product_qty = 1;

    if (is_plus) {
      utils.sendData("accounts/cart", "patch", {
        product_id: product.id,
        product_qty: product_qty,
      });
    } else {
      utils.sendData("accounts/cart", "delete", {
        data: {
          cart_product_id: cartProductId,
          qty: product_qty,
        },
      });
    }
  };
}

function CartProduct(props) {
  console.log(props.cartProductId);
  return (
    <div className="cartProduct">
      <Product
        name={props.product.name}
        price={props.product.price}
        type={props.product.type}
        qty={props.product.qty}
        brand={props.product.brand}
        key={props.product.id}
      ></Product>
      <div className="cartProductInterface">
        <div className="qty">
          <button
            className="qtyBtn btnStyle"
            onClick={changeQty(
              props.cartProductId,
              props.product,
              false
            )}
          >
            -
          </button>
          <div className="qtyInputWrapper">{props.qty}</div>
          <button
            className="qtyBtn btnStyle"
            onClick={changeQty(
              props.cartProductId,
              props.product,
              true
            )}
          >
            +
          </button>
        </div>
        <button
          className="deleteProductBtn btnStyle"
          onClick={removeFromCart(props.cartProductId, props.qty)}
        >
          D
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
