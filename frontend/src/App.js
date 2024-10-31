// import logo from './logo.svg';
import "./App.css";
import Products from "./components/products/products.js";
import Orders from "./components/orders/orders.js";
import Main from "./components/main/main.js";
import Cart from "./components/cart/cart.js";
import WishList from "./components/wishlist/wishlist.js";
import Registration from "./components/registration/registration.js";
import Login from "./components/login/login.js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import get_data from "./utils.js";
import ProductDetail from "./components/product_detail/product_detail.js";

const baseApiUrl = "http://127.0.0.1:8000";
const productIdsArea = "product_ids";
const productIdsApiUrl = `${baseApiUrl}/product_ids`;
const token = localStorage.getItem("token")

const App = () => {
  const { productIdsPromiseInProgress } = usePromiseTracker({ productIdsArea });
  const [productIds, setProductIds] = useState([]);

  useEffect(() => {
    get_data(trackPromise, productIdsApiUrl, token, setProductIds);
    console.log("ids", productIds)
  }, [setProductIds]);
  if (productIdsPromiseInProgress) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="cart" element={<Main element={<Cart />} />} />
            <Route path="orders" element={<Main element={<Orders />} />} />
            <Route path="wish_list" element={<Main element={<WishList />} />} />
            <Route path="" element={<Main element={<Products/>} />} />
            <Route
              path="registration"
              element={<Registration></Registration>}
            ></Route>
            <Route path="login" element={<Login></Login>}></Route>
            {productIds.map(id => <Route path={`products/${id}`} element={<Main element={<ProductDetail id={id}/>}/>}/>)}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;





