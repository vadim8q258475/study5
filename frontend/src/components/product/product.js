import "./product.css"
import tShirt from './t-shirt.jpeg';


function Product(props) {
    return (
      <div className="productWrapper">
      <div className="qtyBox">{props.qty}</div>
      <div className="product" key={props.key}>
        <div className="imgWrapper">
        <img className="productImg" src={tShirt}></img>
                </div>
                <div className="productInfo">
                    <div className="productTextContainer">
                      <div className="productText productTextStart">{props.name}</div>
                      <div className="productText productTextStart">{Number(props.price)} $</div>
                      
                    </div>
                    <div className="productTextContainer">
                      <div className="productText productTextEnd">{props.type.name}</div>
                      <div className="productText productTextEnd"><div className="overflowText">{props.brand.name}</div></div>
                    </div>
                </div>
      </div>
      </div>
    );
  }


  export default Product;