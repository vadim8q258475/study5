import "./products.css";
import Product from "../product/product.js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utils from "../../utils.js";
import SETTINGS from "../../settings.js";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

function priceRangeChange(setPriceRange, priceRange) {
  return () => {
    let elem = document.getElementsByClassName("rangeInput")[0];
    let min = elem.childNodes[0].value;
    let max = elem.childNodes[1].value;
    setPriceRange({
      current_min: min,
      current_max: max,
      min: priceRange.min,
      max: priceRange.max,
    });
  };
}

function applyFilterChanges(types, brands, setProducts) {
  return () => {
    let sortByInputs = document.getElementsByClassName("sortByRadio");
    let colorInputs = document.getElementsByClassName("typeCheckBox");
    let brandInputs = document.getElementsByClassName("brandCheckBox");
    let rangeInput = document.getElementsByClassName("rangeInput")[0];

    let min = rangeInput.childNodes[0].value;
    let max = rangeInput.childNodes[1].value;

    let sortId = utils.getChecked(SETTINGS.SORT_TYPES, sortByInputs)[0];
    let typeIds = utils.getChecked(types, colorInputs);
    let brandIds = utils.getChecked(brands, brandInputs);

    let obj1 = {
      types: typeIds,
      brands: brandIds,
    };
    let obj2 = {
      price_start: String(min),
      price_end: String(max),
    };

    let params = "?";
    params += utils.makeQueryStrFromArrs(obj1);
    params += utils.makeQueryStrFromStrings(obj2);

    if (sortId || sortId == 0) {
      if (SETTINGS.SORT_TYPES[sortId].name[0] == "-") {
        params += utils.makeQueryStrFromStrings({
          sort_by: SETTINGS.SORT_TYPES[sortId - 1].name,
          reverse: "True",
        });
      } else {
        params += utils.makeQueryStrFromStrings({sort_by: SETTINGS.SORT_TYPES[sortId].name});
      }
    }

    utils.sendData("products", "get", {}, params, setProducts);
  };
}

function resetFilters() {
  let sortByInputs = document.getElementsByClassName("sortByRadio");
  let typeInputs = document.getElementsByClassName("typeCheckBox");
  let brandInputs = document.getElementsByClassName("brandCheckBox");

  utils.resetCheckBoxes(sortByInputs);
  utils.resetCheckBoxes(typeInputs);
  utils.resetCheckBoxes(brandInputs);
}

const productsArea = "products";
const brandsArea = "brands";
const typesArea = "types";
const priceRangeArea = "priceRange";

function Products() {
  const { productsPromiseInProgress } = usePromiseTracker({ productsArea });
  const [products, setProducts] = useState([]);

  const { brandsPromiseInProgress } = usePromiseTracker({ brandsArea });
  const [brands, setBrands] = useState([]);

  const { typesPromiseInProgress } = usePromiseTracker({ typesArea });
  const [types, setTypes] = useState([]);

  const { priceRangePromiseInProgress } = usePromiseTracker({ priceRangeArea });
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 0,
    current_min: 0,
    current_max: 0,
  });

  useEffect(() => {
    utils.getData(
      trackPromise,
      SETTINGS.PRODUCTS_URL,
      SETTINGS.TOKEN,
      setProducts
    );
    utils.getData(trackPromise, SETTINGS.BRANDS_URL, SETTINGS.TOKEN, setBrands);
    utils.getData(trackPromise, SETTINGS.TYPES_URL, SETTINGS.TOKEN, setTypes);
    utils.getData(
      trackPromise,
      SETTINGS.MIN_MAX_URL,
      SETTINGS.TOKEN,
      setPriceRange
    );
  }, [setProducts, setBrands, setTypes, setPriceRange]);

  if (
    productsPromiseInProgress ||
    brandsPromiseInProgress ||
    typesPromiseInProgress ||
    priceRangePromiseInProgress
  ) {
    return <div>Подождите, данные загружаются!</div>;
  } else {
    console.log(priceRange);
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
              <form>
                {brands.map((brand) => (
                  <div className="choiceElement">
                    <input
                      type="checkbox"
                      name="brandCheckBox"
                      className="brandCheckBox"
                    />
                    {brand.name}
                  </div>
                ))}
              </form>
            </div>

            <div className="filter">
              <div className="filterTitle">Types</div>
              <form>
                {types.map((type) => (
                  <div className="choiceElement">
                    <input
                      type="checkbox"
                      name="typeCheckBox"
                      className="typeCheckBox"
                    />
                    {type.name}
                  </div>
                ))}
              </form>
            </div>

            <div className="filter">
              <div className="filterTitle">Price</div>
              <div className="rangePriceWrapper">
                <input
                  className="rangePrice"
                  value={priceRange.current_min}
                ></input>
                {/* <input type="range" className="rangeInput"></input> */}
                <div className="rangeInputContainer">
                  <RangeSlider
                    rangeSlideDisabled={true}
                    className="rangeInput"
                    min={priceRange.min}
                    max={priceRange.max}
                    onInput={priceRangeChange(setPriceRange, priceRange)}
                  />
                </div>

                <input
                  className="rangePrice"
                  value={priceRange.current_max}
                ></input>
              </div>
            </div>
            <div className="addFiltersBtnGroup">
              <div className="addFiltersBtnContainer">
                <button
                  className="addFiltersBtn btnStyle"
                  onClick={applyFilterChanges(types, brands, setProducts)}
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
