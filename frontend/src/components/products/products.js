import "./products.css"
import Product from "../product/product.js"

function Products() {
    return (
    
      <div className="products">
        <div className="pageTitle">PRODUCTS</div>
        <div className="productsContainer">
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
            <Product></Product>
        </div>
      </div>
    );
  }


  export default Products;