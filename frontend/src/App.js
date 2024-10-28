// import logo from './logo.svg';
import "./App.css";
import Products from "./components/products/products.js";
import Orders from "./components/orders/orders.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./components/main/main.js";
import Cart from "./components/cart/cart.js";
import React from "react";
import EmptyPage from "./components/empty_page/empty_page.js";
import WishList from "./components/wishlist/wishlist.js";
import Registration from "./components/registration/registration.js";
import Login from "./components/login/login.js";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="cart" element={<Main element={<Cart />} />} />
          <Route path="orders" element={<Main element={<Orders />} />} />
          <Route path="wish_list" element={<Main element={<WishList/>} />}/>
          <Route path="products" element={<Main element={<Products />} />} />
          <Route path="registration" element={<Registration></Registration>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
