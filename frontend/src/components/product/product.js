import "./product.css"
import tShirt from './t-shirt.jpeg';


function Product(props) {
    return (
      <div className="product" key={props.key}>
        <div className="imgWrapper">
        <img className="productImg" src={tShirt}></img>
                </div>
                <div className="productInfo">
                    <div className="productTextContainer">
                      <div className="productText productTextStart">{props.name}</div>
                      <div className="productText productTextStart">{props.brands[0].name}</div>
                      <div className="productText productTextStart">{Number(props.price)} $</div>
                      
                    </div>
                    <div className="productTextContainer">
                      <div className="productText productTextEnd"><div className="productTextList">{props.sizes.map(size => <div className="productTextListEl">{size.name}</div>)}</div></div>
                      <div className="productText productTextEnd">{props.color.name}</div>
                      <div className="productText productTextEnd">{props.type.name}</div>
                    </div>
                </div>
      </div>
    );
  }


  export default Product;