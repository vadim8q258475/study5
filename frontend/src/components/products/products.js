import "./products.css"
import Product from "../product/product.js"
import { trackPromise, usePromiseTracker } from 'react-promise-tracker';
import { useEffect, useState } from 'react';
import axios from 'axios'

const area = 'products';

function Products() {
    const { promiseInProgress } = usePromiseTracker({ area });
    const [ products, setProducts ] = useState([]);

    useEffect(() => {
      const apiUrl = 'http://127.0.0.1:8000/products';
      const instance = axios.create({
        baseURL: apiUrl,
        headers: {'Authorization': 'Token 048f016a3a1e9c783c23cc190e0eb9d2d391e929'},
      });
      trackPromise(
      instance.get().then((resp) => {
        const prods = resp.data
        setProducts(prods);
        console.log(resp.data)
      }));
      }, [setProducts]);

    if (!products || products.length == 0){
        return <h1>Нет товаров</h1>
    }else if(promiseInProgress){
        return (
            <div>Подождите, данные загружаются!</div>
        )
    }else{
        return (
            <div className="products">
                <div className="pageTitle">PRODUCTS</div>
                <div className="productsContainer">
                    {products.map(prod => <Product 
                    name={prod.name} price={prod.price} key={prod.id}></Product>)}
                </div>
            </div>
        )    
    }
  }


  export default Products;