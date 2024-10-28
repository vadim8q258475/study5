import "./product.css"
import tShirt from './t-shirt.jpeg';


function Product(props) {
    return (
      <div className="product" key={props.key}>
        <div className="imgWrapper">
        <img className="productImg" src={tShirt}></img>
                </div>
                <div className="productInfo">
                    <div className="productText">{props.name}</div>
                    <div className="productText">{props.price} $</div>
                </div>
      </div>
    );
  }


  export default Product;