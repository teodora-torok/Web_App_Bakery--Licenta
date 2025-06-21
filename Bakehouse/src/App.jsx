import React from 'react';
import Menu_Bar from './app_components/Menu_Bar/Menu_Bar';
import { Route, Routes } from 'react-router-dom';
import Home from './app_pages/Home/Home';
import Contact from './app_pages/Contact/Contact';
import Explore from './app_pages/Explore/Explore';
import Product_Description from './app_pages/Product_Description/Product_Description';
import Cart from './app_pages/Cart/Cart';
// Import the wrapped version of Order_Products (with Stripe Elements)
import WrappedOrderProducts from './app_pages/Order_Products/Order_Products';
import Login from './app_components/Login/Login';
import Register from './app_components/Register/Register';
import { ToastContainer } from 'react-toastify';
import My_Orders from './app_pages/My_Orders/My_Orders';

const App = () => {
  return (
    <div>
      <Menu_Bar />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/product/:product_id' element={<Product_Description />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<WrappedOrderProducts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myorders' element={<My_Orders />} />
      </Routes>
    </div>
  );
};

export default App;
