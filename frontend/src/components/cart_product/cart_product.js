import Product from "../product/product";
import "./cart_product.css"


function CartProduct() {
    return (
            <div className="cartProduct">
                <Product></Product>
                <div className="cartProductInterface">
                    <div className="qty">
                        <button className="qtyBtn">-</button>
                        <div className="qtyInputWrapper"><input className="qtyInput" ></input></div>
                        <button className="qtyBtn">+</button>
                    </div>
                    <button className="deleteProductBtn">D</button>
                </div>
            </div>
    );
  }


  export default CartProduct;