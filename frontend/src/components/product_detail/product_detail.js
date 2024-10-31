import "./product_detail.css";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import get_data from "../../utils.js";
import tShirt from "../product/t-shirt.jpeg";
import axios from "axios";

const productApiUrl = "http://127.0.0.1:8000/products/";
const productArea = "product";
const token = localStorage.getItem("token");

function addToWishList(product) {
  return () => {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/accounts",
      headers: { Authorization: `Token ${token}` },
    });

    instance.patch("wish_list", { product_id: product.id }).then((resp) => {
      console.log(resp);
    });
  };
}


function addToCart(product) {
  return () => {
    let inputs = document.getElementsByClassName("radioInput");
    let size_id;
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].checked) {
        size_id = product.sizes[i].id;
        break
      }
    }

    console.log({ product_id: product.id, size_id: size_id, qty: 1 });
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8000/accounts",
      headers: { Authorization: `Token ${token}` },
    });

    instance.patch('cart', { 'product_id': product.id, 'size_id': size_id, 'product_qty': 1}).then((resp) => {
      console.log(resp)
    });
  };
}

function ProductDetail(props) {
  const { productPromiseInProgress } = usePromiseTracker({ productArea });
  const [product, setProduct] = useState(null);

  useEffect(() => {
    get_data(trackPromise, `${productApiUrl}${props.id}`, token, setProduct);
    console.log(product);
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
            <div className="productDetailInfoTitle">Description:</div>{" "}
            {product.description}
          </div>
          {/* <div className="productDetailInfoText">
          <div className="productDetailInfoTitle">Brand:</div> <div className="productsDetailValuesList">
            {product.brands.map((brand) => (
              <div className="productsDetailValuesListEl noBorder">{brand.name}</div>
            ))}
            </div>
          </div> */}
          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Color:</div>{" "}
            {product.color.name}
          </div>
          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Sizes:</div>{" "}
            <div className="productsDetailValuesList">
              <form>
              {product.sizes.map((size) => (
                <div>
                  <input
                    className="radioInput"
                    type="radio"
                    name="sizeRadio"
                  ></input>
                  <div className="productsDetailValuesListEl">{size.name}</div>
                </div>
              ))}</form>
            </div>
          </div>
          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Qty:</div> {product.qty}
          </div>
          <div className="productDetailInfoText">
            <div className="productDetailInfoTitle">Price:</div> {product.price}
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
