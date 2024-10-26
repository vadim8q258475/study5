import "./product.css"
import tShirt from './t-shirt.jpeg';


function Product() {
    return (
      <div className="product">
        <div class="imgWrapper">
        <img class="productImg" src={tShirt}></img>
                </div>
                <div class="productInfo">
                    <div class="productName align-center">Name</div>
                    <div class="productBrand align-center">Brand</div>
                    <div class="productType align-center">Jeans</div>
                    <div class="productPrice align-center">399 $</div>
                </div>
      </div>
    );
  }


  export default Product;