import "./App.css";
import Products from "./components/products/products.js";
import Orders from "./components/orders/orders.js";
import Main from "./components/main/main.js";
import Cart from "./components/cart/cart.js";
import WishList from "./components/wishlist/wishlist.js";
import Registration from "./components/registration/registration.js";
import Login from "./components/login/login.js";
import ProductDetail from "./components/product_detail/product_detail.js";

import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";

import SETTINGS from "./settings.js";
import utils from "./utils.js";

const productSlugsArea = "product_ids";

const App = () => {
  const { productSlugsPromiseInProgress } = usePromiseTracker({ productSlugsArea });
  const [productSlugs, setproductSlugs] = useState([]);

  useEffect(() => {
    utils.getData(trackPromise, SETTINGS.PRODUCT_IDS_URL, SETTINGS.TOKEN, setproductSlugs);
  }, [setproductSlugs]);
  if (productSlugsPromiseInProgress) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
    
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="cart" key={`link${0}`}element={<Main element={<Cart />} />} />
            <Route path="orders" key={`link${1}`} element={<Main element={<Orders />} />} />
            <Route path="wish_list" key={`link${2}`} element={<Main element={<WishList />} />} />
            <Route path="" key={`link${3}`} element={<Main element={<Products />} />} />
            <Route
              path="registration"
              element={<Registration></Registration>}
              key={`link${4}`}
            ></Route>
            <Route path="login" key={`link${5}`} element={<Login></Login>}></Route>
            {productSlugs.map((slug) => (
              <Route
                key={slug}
                path={`products/${slug}`}
                element={<Main element={<ProductDetail slug={slug}/>} />}
              />
            ))}
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
