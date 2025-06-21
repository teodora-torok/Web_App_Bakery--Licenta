import React, { useContext } from 'react';
import './Menu_Bar.css';
import { Media } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { ContextStore } from '../../context/Context_Store';


const Menu_Bar = () => {
  const { Product_Quantity, token, set_Token, setProduct_Quantity } = useContext(ContextStore)
  const Unique_Product = Object.values(Product_Quantity).filter(qty => qty > 0).length;

  const Navigation = useNavigate();

  const Log_Out = () => {
    localStorage.removeItem('token');
    set_Token("");
    setProduct_Quantity({});
    Navigation("/");
  }

  return (

    
    <nav className="navbar navbar-expand-lg"
      style={{ backgroundColor: '#fbfbf5' }}
    >
      <div className="container-fluid">
        <img src={Media.bakery_logo} alt="" className='bakery_logo' height={100} width={100} />
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">HOME</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/explore">EXPLORE</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">CONTACT</Link>
            </li>
          </ul>
          <div className="menubar-right">
            <Link to={`/cart`}>
              <div className="position-relative">
                <img src={Media.shopping_cart} alt="" height={50} width={50} className='position-relative' />
                <span
                  className='position-absolute top-0 start-100 translate-middle badge rounded-pill'>{Unique_Product}
                </span>
              </div>
            </Link>
            {
              !token ? (
                <>
                  <button
                    className='btn button_login'
                    style={{
                      backgroundColor: '#f1ede1',
                      color: '#472f17',
                      marginLeft: '30px',
                      fontSize: '16.5px',
                      letterSpacing: '5px',
                      wordSpacing: '1.25px',
                      padding: '12px 24px',
                      border: 'none',
                    }} onClick={() => Navigation('/login')}>LOG IN
                  </button>
                  <button className='btn btn_new_account ' onClick={() => Navigation('/register')} >CREATE A NEW ACCOUNT </button>
                </>) : (<div className="dropdown text-end">

                  <a href="#"
                    className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >

                    <img src={Media.user_logo} alt="" width={50} height={50} className="rounded-circle" /></a>

                  <ul className="dropdown-menu dropdown-menu-end">
                    <li className="dropdown-item" onClick={() => Navigation('/myorders')}>MY ORDERS</li>
                    <hr></hr>
                    <li className="dropdown-item" onClick={Log_Out}>LOG OUT</li>

                  </ul>
                </div>
              )

            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Menu_Bar;