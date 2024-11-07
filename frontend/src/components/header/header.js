import "./header.css";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const apiUrl = "http://127.0.0.1:8000/accounts/auth/token/logout/";

function logOutFn(setIsAuth) {
  return () => {
    const instance = axios.create({
      baseURL: apiUrl,
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    });
    console.log(`Token ${localStorage.getItem("token")}`);

    instance.post().then((resp) => {
      console.log(resp);
      setIsAuth(false);
    });
  };
}

function Header() {
  const [isAuth, setIsAuth] = useState(true)

  useEffect(() => {}, [setIsAuth])
  if(isAuth){
  return (
    <div className="header">
      <div className="logoContainer">SHOP NAME</div>
      <nav>
        <div className="navElement">
          <div className="logOuts textHover" onClick={logOutFn(setIsAuth)}>
            LOGOUT
          </div>
        </div>
        <div className="navElement">
          <Link className="textHover" to="/">
            PRODUCTS
          </Link>
        </div>
        <div className="navElement">
          <Link className="textHover" to="/cart">
            CART
          </Link>
        </div>
        <div className="navElement">
          <Link className="textHover" to="/wish_list">
            WISHLIST
          </Link>
        </div>
        <div className="navElement">
          <Link className="textHover" to="/orders">
            ORDERS
          </Link>
        </div>
      </nav>
    </div>
  );
}else{
  return <Navigate to="/login"></Navigate>
}
}

export default Header;
