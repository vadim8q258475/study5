import "./wish_list_product.css";
import Product from "../product/product.js";

function WishListProduct(props) {
  return (
    <div className="wishListProduct">
      <button className="like btnStyle">D</button>
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
