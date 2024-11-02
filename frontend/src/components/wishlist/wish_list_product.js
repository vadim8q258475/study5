import "./wish_list_product.css";
import Product from "../product/product.js";

function WishListProduct(props) {
    return (
    <div className="wishListProduct">
            <div className="like"></div>
            <Product name={props.name}
                    price={props.price}
                    type={props.type}
                    color={props.color}
                    sizes={props.sizes}
                    brands={props.brands}
                    key={props.id}></Product>
    </div>
    )

  
}

export default WishListProduct;
