import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="p-5 mb-4 rounded-3 mt-1 mt-4 mb-4"
    style={{ backgroundColor: '#f1ede1'}}
    >
        <div className="container-fluid py-5">
            <h1 className='title'>Fresh & Artisanal</h1>
            <p className='subtitle'>Baked to Perfection, Delivered with Love</p>
            <Link to="/explore" className='button'>ORDER NOW</Link>
        </div>
    </div>
    
  )
}

export default Header;
