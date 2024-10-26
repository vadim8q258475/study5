import CartProduct from "../cart_product/cart_product";
import Product from "../product/product";
import "./cart.css"


function Cart() {
    return (
      <div className="cart">
        <div className="pageTitle">CART</div>
        <div className="cartContainer">

        <div className="createOrder">
            <div className="cartContentTitle">Create order</div>
            <div className="cartText"><div className="cartTitle">Total:</div> 34 000 $</div>
            <div className="cartText"><div className="cartTitle">Qty:</div> 23</div>
            <div className="cartText"><div className="cartTitle">Address:</div> <br></br><textarea></textarea></div>
            <div className="deliveryTypes">
                <div className="cartText"><div className="cartTitle">DeliveryType: </div></div>
                <form>
                <div className="deliveryType"><input type='radio' name='deliveryType'/>CDEK</div>
                <div className="deliveryType"><input type='radio' name='deliveryType'/>CDEK</div>
                <div className="deliveryType"><input type='radio' name='deliveryType'/>CDEK</div>
                <div className="deliveryType"><input type='radio' name='deliveryType'/>CDEK</div>
                </form>
            </div>
            <div><button className="createOrderBtn">Create order</button></div>
        </div>
      

        <div className="cartProducts">
            <div className="cartProductsTitle"> Cart products</div>
            <div className="cartProductsContainer"></div>
            <CartProduct></CartProduct>
            <CartProduct></CartProduct>
            <CartProduct></CartProduct>
            <CartProduct></CartProduct>
        </div>

        
        </div>
      
      </div>
    );
  }


  export default Cart;