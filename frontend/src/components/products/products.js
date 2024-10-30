import "./products.css";
import Product from "../product/product.js";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useEffect, useState } from "react";
import axios from "axios";
import get_data from "../../utils.js";
import EmptyPage from "../empty_page/empty_page.js";

const baseApiUrl = "http://127.0.0.1:8000";
const token = localStorage.getItem("token")

const productsArea = "products";
const productsApiUrl = `${baseApiUrl}/products`;

const colorsArea = "colors";
const colorsApiUrl = `${baseApiUrl}/colors`;

const sizesArea = "sizes";
const sizesApiUrl = `${baseApiUrl}/sizes`;

const brandsArea = "brands";
const brandsApiUrl = `${baseApiUrl}/brands`;

const typesArea = "types";
const typesApiUrl = `${baseApiUrl}/types`;

// const Area = "";
// const ApiUrl = `${baseApiUrl}/`

function Products() {
  const { productsPromiseInProgress } = usePromiseTracker({ productsArea });
  const [products, setProducts] = useState([]);

  const { colorsPromiseInProgress } = usePromiseTracker({ colorsArea });
  const [colors, setColors] = useState([]);

  const { sizesPromiseInProgress } = usePromiseTracker({ sizesArea });
  const [sizes, setSizes] = useState([]);

  const { brandsPromiseInProgress } = usePromiseTracker({ brandsArea });
  const [brands, setBrands] = useState([]);

  const { typesPromiseInProgress } = usePromiseTracker({ typesArea });
  const [types, setTypes] = useState([]);

  useEffect(() => {
    get_data(trackPromise, productsApiUrl, token, setProducts);
    get_data(trackPromise, colorsApiUrl, token, setColors);
    get_data(trackPromise, sizesApiUrl, token, setSizes);
    get_data(trackPromise, brandsApiUrl, token, setBrands);
    get_data(trackPromise, typesApiUrl, token, setTypes);
  }, [setProducts]);

  if (
    productsPromiseInProgress ||
    sizesPromiseInProgress ||
    brandsPromiseInProgress ||
    typesPromiseInProgress ||
    colorsPromiseInProgress
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

              <div className="radioElement">
                <input type="radio" />
                Price increase
              </div>
              <div className="radioElement">
                <input type="radio" />
                Price decrease
              </div>
              <div className="radioElement">
                <input type="radio" />
                From A to Z
              </div>
              <div className="radioElement">
                <input type="radio" />
                From Z to A
              </div>
            </div>
            <div className="filter">
              <div className="filterTitle">Colors</div>

              {colors.map((color) => (
                <div className="choiceElement">
                  <input type="checkbox" />
                  {color.name}
                </div>
              ))}
            </div>
            <div className="filter">
              <div className="filterTitle">Brands</div>

              {brands.map((brand) => (
                <div className="choiceElement">
                  <input type="checkbox" />
                  {brand.name}
                </div>
              ))}
            </div>
            <div className="filter">
              <div className="filterTitle">Sizes</div>

              {sizes.map((size) => (
                <div className="choiceElement">
                  <input type="checkbox" />
                  {size.name}
                </div>
              ))}
            </div>
            <div className="filter">
              <div className="filterTitle">Types</div>

              {types.map((type) => (
                <div className="choiceElement">
                  <input type="checkbox" />
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
            <div className="addFiltersBtnContainer">
              <button className="addFiltersBtn btnStyle">Apply Changes</button>
            </div>
          </div>
          <div className="productsContainerWrapper">
            <div className="productsContainer">
              {products.map((prod) => (
                <Product
                  name={prod.name}
                  price={prod.price}
                  key={prod.id}
                ></Product>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
