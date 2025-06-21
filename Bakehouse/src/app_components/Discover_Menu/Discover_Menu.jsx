import React, { useRef } from 'react';
import { Product_Categories } from '../../assets/assets';
import './Discover_Menu.css';



const Discover_Menu = ({product_category, setProd_Category}) => {

  //pentru scroll la categorii
  const scroll_menu= useRef(null);
  const left_scroll= () => {
    if(scroll_menu.current) {
      scroll_menu.current.scrollBy({left: -200, behavior: 'smooth'});
    }
  };

  const right_scroll= () => {
    if(scroll_menu.current) {
      scroll_menu.current.scrollBy({left: 200, behavior: 'smooth'});
    }
  };

  return (
    <div className="discover-menu position-relative"
    style={{ backgroundColor: '#f1ede1', borderRadius: '8px'}}
    >
      <h1 className="d-flex align-items-center justify-content-center" style={{ marginBottom: '40px'}}>
        Discover Our Products
      <div className="d-flex">
        <i className='bi bi-arrow-left-circle scroll-icon' onClick={left_scroll}></i>
        <i className='bi bi-arrow-right-circle scroll-icon' onClick={right_scroll}></i>
      </div>
      </h1>

      <div className="d-flex justify-content-between gap-4 overflow-auto discover-menu-list"
      ref={scroll_menu}
      >
        {
          Product_Categories.map((item, index) => {
            return (
              <div key={index} className="text-center discover-menu-list-item" onClick={() => setProd_Category(prev =>prev===item.product_category ? 'All': item.product_category)}>
                <img src={item.icon} alt="" className={item.product_category===product_category ? 'rounded-circle active': 'rounded-circle'} height={160} width={180}/>
                <p className='mt-2 fw-bold'>{item.product_category}</p>
                </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Discover_Menu;