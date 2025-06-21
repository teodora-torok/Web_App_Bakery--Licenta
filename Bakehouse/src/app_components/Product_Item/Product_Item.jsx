import React from 'react';
import './Product_Item.css';
import { Link } from 'react-router-dom';
import { Media } from '../../assets/assets';
import { ContextStore} from '../../context/Context_Store';
import { useContext } from 'react';


const Product_Item = ({product_name, product_description, product_id, product_imageUrl, product_price}) => {
  const {QuantityIncrease, QuantityDecrease, Product_Quantity}= useContext(ContextStore);
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center">


<div className="card" style={{"maxWidth": "320px"}}>
    <img src={product_imageUrl} className="card-img-top product-image" alt="Product Image" height={232} width={18}/>
    <div className="card-body">
        <h5 className="card-title"
          style={{
            letterSpacing: "10px !important",
            wordSpacing: "10px !important",
            fontSize: "25px !important",
            color: "#472f17",
            textAlign: "center"
          }}
        >{product_name}</h5>
          {/*<p className="description">{product_description}</p>*/}
        <div className="d-flex justify-content-between align-items-center">
            <span className="h5 mb-0"
                style={{
                        fontSize: "18px"
                      }}
            >{product_price} RON</span>
            <div>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-fill text-warning"></i>
                <i className="bi bi-star-half text-warning"></i>
                <small className="text-muted">(4.5)</small>
            </div>
        </div>
    </div>
    <div className="card-footer d-flex justify-content-between"
    style={{
        backgroundColor: "#D8C7BF",
        border: "none"
    }}>
        <Link className="btn btn-primary btn-sm" to={`/product/${product_id}`}>View Product Details</Link>



        {Product_Quantity[product_id] > 0 ? (
        <div className="d-flex align-items-center justify-content-center gap-2">
          <button 
            className="btn btn-outline-secondary btn-sm p-0" 
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => QuantityDecrease(product_id)}
          >
            <img 
              src={Media.decrease} 
              alt="Decrease" 
              style={{ width: '40px', height: '40px' }} 
            />
          </button>

          <span className="fw" style={{ fontSize: '18px' }} >{Product_Quantity[product_id]}

          </span>

          <button 
            className="btn btn-outline-secondary btn-sm p-0" 
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => QuantityIncrease(product_id)}
          >
            <img 
              src={Media.add} 
              alt="Add" 
              style={{ width: '40px', height: '40px' }} 
            />
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <button 
            className="btn btn-outline-secondary btn-sm p-0" 
            style={{ background: 'transparent', border: 'none' }}
            onClick={() => QuantityIncrease(product_id)}
          >
            <img 
              src={Media.add} 
              alt="Add" 
              style={{ width: '40px', height: '40px' }} 
            />
          </button>
        </div>
      )}
    </div>
  </div>
  </div>
  )
}

export default Product_Item;