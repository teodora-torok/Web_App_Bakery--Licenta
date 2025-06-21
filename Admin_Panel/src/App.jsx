import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Add_Product from './pages/Add_Product/Add_Product'
import Display_Product from './pages/Display_Product/Display_Product'
import Customer_Orders from './pages/Customer_Orders/Customer_Orders'
import Side_Bar from './components/Side_Bar/Side_Bar'
import Navigation_Bar from './components/Navigation_Bar/Navigation_Bar'
import './App.css';
import { ToastContainer } from 'react-toastify';


const App = () => {
  const [Visible_Side_Bar, setVisible_Side_Bar]= useState(true);
  const toggle_Side_Bar=() => {
    setVisible_Side_Bar(!Visible_Side_Bar);
  }
  return (
    <div className="d-flex" id="wrapper">
            
            <Side_Bar Visible_Side_Bar= {Visible_Side_Bar} />
            
            <div id="page-content-wrapper">

            <Navigation_Bar toggle_Side_Bar= {toggle_Side_Bar} />
            <ToastContainer />
                
                <div className="container-fluid">
                    <Routes>
                      <Route path='/add_product' element={<Add_Product/>} />
                      <Route path='/display_product' element={<Display_Product/>} />
                      <Route path='/customers_orders' element={<Customer_Orders/>} />
                      <Route path='/' element={<Display_Product/>} />
                    </Routes>
                </div>
            </div>
      </div>
  )
}

export default App