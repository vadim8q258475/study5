import "./product_detail.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import get_data from "../../utils.js";
import tShirt from "../product/t-shirt.jpeg";
import axios from "axios";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

const productArea = "product";

function addToWishList(product) {
  return () => {
    utils.sendData("accounts/wish_list", "patch", { product_id: product.id });
  };
}

const lorem = "Est minim adipisicing ex dolor et duis aliquip laborum incididunt eiusmod commodo esse ut laborum. Occaecat dolor fugiat magna proident et eiusmod cillum excepteur sunt et sint in et esse. Ea mollit aliqua ullamco voluptate non. Aute reprehenderit ad veniam est aliquip esse aliquip exercitation. Incididunt aute ad reprehenderit ullamco dolor ut ullamco."

function addToCart(product) {
  return () => {
    utils.sendData("accounts/cart", "patch", {
      product_id: product.id,
      product_qty: 1,
    }, );
  };
}

function ProductDetail(props) {
  const { productPromiseInProgress } = usePromiseTracker({ productArea });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    utils.getData(trackPromise, `${SETTINGS.PRODUCTS_URL}/${props.id}`, SETTINGS.TOKEN, setProduct);
  }, [setProduct]);
  if (productPromiseInProgress || !product) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="productDetail">
        <div className="productDetailGallery">
          <img className="productDetailImg" src={tShirt}></img>
        </div>
        
        <div className="productDetailInfo">
          <div className="productDetailInfoHead">{product.name}</div>

          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Description: </div> <div className="lorem">{product.des}</div>
          </div>

          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Brand:</div>
            {product.brand.name}
          </div>

          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Type:</div>
            {product.type.name}
          </div>
        
          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Price:</div> {Number(product.price)} $
          </div>

          <div className="productDetailBtnGroup">
            <button
              className="btnStyle productDetailBtn"
              onClick={addToCart(product)}
            >
              Add to cart
            </button>
            <button
              className="btnStyle productDetailBtn"
              onClick={addToWishList(product)}
            >
              Add to wish list
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default ProductDetail;
