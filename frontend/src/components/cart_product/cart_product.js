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

function changeQty(cartProductId, product, size_name, is_plus) {
  return () => {
    let product_qty = 1;

    if (is_plus) {
      let size_id;
      for (let size of product.sizes) {
        if (size.name == size_name) {
          size_id = size.id;
          break;
        }
      }

      utils.sendData("accounts/cart", "patch", {
        product_id: product.id,
        product_qty: product_qty,
        size_id: size_id,
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
        color={props.product.color}
        sizes={[{ name: props.size_name }]}
        brands={props.product.brands}
        key={props.product.id}
      ></Product>
      <div className="cartProductInterface">
        <div className="qty">
          <button
            className="qtyBtn btnStyle"
            onClick={changeQty(
              props.cartProductId,
              props.product,
              props.size_name,
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
              props.size_name,
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
