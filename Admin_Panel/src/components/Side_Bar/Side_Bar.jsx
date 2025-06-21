import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../../assets/assets';
import './Side_Bar.css';

const Side_Bar = ({Visible_Side_Bar}) => {
  return (
    
    <div className={`border-end ${Visible_Side_Bar ? '' : 'd-none'}`} id="sidebar-wrapper">
        <div className="sidebar-heading border-bottom ">
            <img src= {assets.bakery_logo} alt="" height= {230} width= {230} />
        </div>
        <div className="list-group list-group-flush">
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/add_product">
            <img src= {assets.add_product} alt="" height= {50} width= {50}/>
            Add Product</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/display_product">
            <img src= {assets.display_product} alt="" height= {50} width= {50}/>
            Display Products</Link>
            <Link className="list-group-item list-group-item-action list-group-item-light p-3" to="/customers_orders">
            <img src= {assets.orders} alt="" height= {50} width= {50}/>
            Orders Overview</Link>
        </div>
    </div>
  )
}

export default Side_Bar;