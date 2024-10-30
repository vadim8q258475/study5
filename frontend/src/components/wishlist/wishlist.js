import "./wish_list.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";
import get_data from "../../utils.js";
import EmptyPage from "../empty_page/empty_page.js";
import Product from "../product/product.js";
import WishListProduct from "./wish_list_product.js";

const area = "products";
const apiUrl = "http://127.0.0.1:8000/accounts/wish_list";
const token = "048f016a3a1e9c783c23cc190e0eb9d2d391e929";

function WishList() {
  const { promiseInProgress } = usePromiseTracker({ area });
  const [wishList, setWishList] = useState(null);

  useEffect(() => {
    get_data(trackPromise, apiUrl, token, setWishList);
  }, [setWishList]);

  if (!wishList || wishList.products.length == 0) {
    return <EmptyPage text="No products in wish list" />;
  } else if (promiseInProgress) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="wishList">
        <div className="pageTitle">WISH LIST</div>
        <div className="wishContainer">
            {wishList.products.map((prod) => (
            <WishListProduct name={prod.name} price={prod.price} key={prod.id}></WishListProduct>
            ))}
        </div>
      </div>
    );
  }
}

export default WishList;
