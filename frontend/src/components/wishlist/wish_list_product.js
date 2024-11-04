import "./wish_list_product.css";
import Product from "../product/product.js";
import utils from "../../utils.js";

function removeFromWishList(productId) {
  return () => {
    utils
      .sendData("accounts/wish_list", "delete", {
        data: { product_id: productId },
      })
      .then((res) => {
        window.location.reload();
      });
  };
}

function WishListProduct(props) {
  return (
    <div className="wishListProduct">
      <button className="like btnStyle" onClick={removeFromWishList(props.id)}>
        D
      </button>
      <Product
        name={props.name}
        price={props.price}
        type={props.type}
        brand={props.brand}
        key={props.id}
        des={props.des}
        qty={props.qty}
      ></Product>
    </div>
  );
}

export default WishListProduct;
