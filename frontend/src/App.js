// import logo from './logo.svg';
import './App.css';
import Product from './components/product/product.js'
import Products from './components/products/products.js'
import Header from './components/header/header.js'
import Orders from './components/orders/orders.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './components/main/main.js';
import Cart from './components/cart/cart.js';


// class Product{
//   constructor(name, des, type, colors, 
//     brands, size, qty, price){
//     this.name = name
//     this.des = des
//     this.type = type
//     this.colors = colors
//     this.brands = brands
//     this.size = size
//     this.qty = qty
//     this.price = price
//   }
// }

// class OrderProducts{
//   constructor(product, qty){
//     this.product = product
//     this.qty = qty
//   }
// }

// class Order{
//   constructor(address, products, delivery_type, status, total){
//     this.address = address
//     this.products = products
//     this.delivery_type = delivery_type
//     this.status = status
//     this.total = total
//   }
// }


function App() {
  return (
    <div className="App">
      {/* <Header></Header>
       <Orders></Orders> 
      <Products></Products> */}
      <BrowserRouter>
      <Routes>
        <Route path="cart" element={
          <Main element={
            <Cart/>
          }/>
        } />
        <Route path="orders" element={
          <Main element={
            <Orders/>
          }/>
          } />
        {/* <Route path="wish_list" element={} /> */}
        <Route path="products" element={
          <Main element={
            <Products/>
          }/>
        } />
        {/* <Route path="" element={} /> */}
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
