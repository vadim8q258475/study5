import Product from "../product/product";
import "./cart_product.css"


function CartProduct(props) {
    return (
            <div className="cartProduct">
                <Product name={props.name} price={props.price} key={props.id}></Product>
                <div className="cartProductInterface">
                    <div className="qty">
                        <button className="qtyBtn btnStyle" btnStyle>-</button>
                        <div className="qtyInputWrapper"><input className="qtyInput" value={props.qty}></input></div>
                        <button className="qtyBtn btnStyle">+</button>
                    </div>
                    <button className="deleteProductBtn btnStyle">D</button>
                </div>
            </div>
    );
  }


  export default CartProduct;