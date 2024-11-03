import "./products.css";
import Product from "../product/product.js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

const sortTypes = ["price", "-price", "name", "-name"];

function getChecked(values, elements) {
  let valueIds = [];
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].checked) {
      valueIds.push(values[i].id);
    }
  }
  return valueIds;
}


function resetCheckBoxes(elements) {
  for (let elem of elements) {
    elem.checked = false;
  }
}

function applyFilterChanges(colors, brands, setProducts) {
  return () => {
    let sortByInputs = document.getElementsByClassName("sortByRadio");

    let colorInputs = document.getElementsByClassName("colorCheckBox");
    let brandInputs = document.getElementsByClassName("brandCheckBox");

    let priceInput = document.getElementsByClassName("rangeInput")[0];

    let sortId;
    for (let i = 0; i < sortByInputs.length; i++) {
      if (sortByInputs[i].checked) {
        sortId = i;
        break;
      }
    }

    let colorIds = getChecked(colors, colorInputs);
    let brandIds = getChecked(brands, brandInputs);
    
    let obj = {
      colors: colorIds,
      brands: brandIds,
    }

    let params = utils.makeQueryStrFromObj(obj)
  
    if (sortId || sortId == 0) {
      if (sortTypes[sortId][0] == "-") {
        params += "reverse=True&";
        params += "sort_by=" + sortTypes[sortId - 1] + "&";
      } else {
        params += "sort_by=" + sortTypes[sortId] + "&";
      }
    }

    utils.sendData(
      "products",
      "get",
      {},
      params,
      setProducts
    );
  };
}

function resetFilters() {
  let sortByInputs = document.getElementsByClassName("sortByRadio");
  let typeInputs = document.getElementsByClassName("typeCheckBox");
  let brandInputs = document.getElementsByClassName("brandCheckBox");

  resetCheckBoxes(sortByInputs);
  resetCheckBoxes(typeInputs);
  resetCheckBoxes(brandInputs);
}

const productsArea = "products";
const brandsArea = "brands";
const typesArea = "types";


function Products() {
  const { productsPromiseInProgress } = usePromiseTracker({ productsArea });
  const [products, setProducts] = useState([]);

  const { brandsPromiseInProgress } = usePromiseTracker({ brandsArea });
  const [brands, setBrands] = useState([]);

  const { typesPromiseInProgress } = usePromiseTracker({ typesArea });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    utils.getData(trackPromise, SETTINGS.PRODUCTS_URL, SETTINGS.TOKEN, setProducts);
    utils.getData(trackPromise, SETTINGS.BRANDS_URL, SETTINGS.TOKEN, setBrands);
    utils.getData(trackPromise, SETTINGS.TYPES_URL, SETTINGS.TOKEN, setTypes);
  }, [setProducts, setBrands, setTypes]);

  if (
    productsPromiseInProgress ||
    brandsPromiseInProgress ||
    typesPromiseInProgress 
  ) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    return (
      <div className="products">
        <div className="pageTitle">PRODUCTS</div>
        <div className="productsPageContainer">
          <div className="productsSortFilter">
            <div className="filter">
              <div className="filterTitle">Sort By</div>
              <form>
                <div className="radioElement">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  Price increase
                </div>
                <div className="radioElement">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  Price decrease
                </div>
                <div className="radioElement">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  From A to Z
                </div>
                <div className="radioElement">
                  <input
                    type="radio"
                    name="sortByRadio"
                    className="sortByRadio"
                  />
                  From Z to A
                </div>
              </form>
            </div>
        
            <div className="filter">
              <div className="filterTitle">Brands</div>
              {brands.map((brand) => (
                <div className="choiceElement">
                  <input type="checkbox" className="brandCheckBox" />
                  {brand.name}
                </div>
              ))}
            </div>

            <div className="filter">
              <div className="filterTitle">Types</div>
              {types.map((type) => (
                <div className="choiceElement">
                  <input type="checkbox" className="typeCheckBox" />
                  {type.name}
                </div>
              ))}
            </div>


            <div className="filter">
              <div className="filterTitle">Price</div>
              <div className="rangePriceWrapper">
                <input className="rangePrice" value={120}></input>
                <input type="range" className="rangeInput"></input>
                <input className="rangePrice" value={12000}></input>
              </div>
            </div>
            <div className="addFiltersBtnGroup">
              <div className="addFiltersBtnContainer">
                <button
                  className="addFiltersBtn btnStyle"
                  onClick={applyFilterChanges(
                    brands,
                    types,
                    setProducts
                  )}
                >
                  Apply Changes
                </button>
              </div>
              <div className="addFiltersBtnContainer">
                <button
                  className="addFiltersBtn btnStyle"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
          <div className="productsContainerWrapper">
            <div className="productsContainer">
              {products.map((prod) => (
                <Link to={`products/${prod.id}`}>
                  <Product
                    name={prod.name}
                    price={prod.price}
                    type={prod.type}
                    brand={prod.brand}
                    key={prod.id}
                    des={prod.des}
                    qty={prod.qty}
                  ></Product>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
