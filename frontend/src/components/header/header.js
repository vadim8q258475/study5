import "./header.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="logoContainer">SHOP NAME</div>
      <nav>
        <div className="navElement">
          <Link to="/products">PRODUCTS</Link>
        </div>
        <div className="navElement">
          <Link to="/cart">CART</Link>
        </div>
        <div className="navElement">
          <Link to="/wish_list">WISHLIST</Link>
        </div>
        <div className="navElement">
          <Link to="/orders">ORDERS</Link>
        </div>
      </nav>
    </div>
  );
}

export default Header;
