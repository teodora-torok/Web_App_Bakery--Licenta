import React from 'react';
import {assets} from '../../assets/assets';
import './Navigation_Bar.css';

const Navigation_Bar = ({toggle_Side_Bar}) => {
  return (
    <nav className="nav_bar ">
        <div className="container-fluid">
            <button className="btn btn-primary" id="sidebarToggle" onClick={toggle_Side_Bar}
                style={{ backgroundColor: '#f1ede1', border: 'none' }}>
            <img src= {assets.menu_icon} alt="" height= {65} width= {65}/>
            </button>
        </div>
    </nav>
  )
}
export default Navigation_Bar;