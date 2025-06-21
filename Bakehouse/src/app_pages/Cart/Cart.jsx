import React, { useContext } from 'react';
import './Cart.css'
import { ContextStore } from '../../context/Context_Store';
import { Link, useNavigate } from 'react-router-dom';
import { Media } from '../../assets/assets';

const Cart = () => {
    const Navigation= useNavigate();
    const { Products_List, QuantityIncrease, QuantityDecrease, Product_Quantity, Deletefrom_Cart } = useContext(ContextStore);
    //cart products
    const Cart_Products = Products_List.filter(product => Product_Quantity[product.product_id] > 0);

    //calculare total de platit
    const total = Cart_Products.reduce((acc, product) => acc + product.product_price * Product_Quantity[product.product_id], 0);
    const shipping_price = total === 0 ? 0.0 : 10;
    const grand_total = total + shipping_price;

    return (
        <div className="container py-5">
            <h1 className="mb-6">YOUR SHOPPING CART</h1>
            <div className="row">
                <div className="col-lg-8">
                    {
                        Cart_Products.length === 0 ? (
                            <p
                            style={{
                                color: '#472f17',
                                letterSpacing: '8px',
                                wordSpacing: '8px',
                                fontSize: '18px',
                                marginTop: '20px',
                                marginBottom: '400px'
                            }}
                            >The Cart is empty.</p>
                        ) : (
                            <div className="card mb-4">
                                <div className="card-body"
                                  style={{
                                    padding: "20px",
                                    borderRadius: "8px"
                                  }}
                                >
                                    {Cart_Products.map((product) => (
                                        <div key={product.product_id} className="row cart-item mb-3">
                                            <div className="col-md-3 mt-6"  style={{ marginTop: '35px', marginBottom: '25px'}} >
                                                <img src={product.product_imageUrl} alt={product.product_name} className="img-fluid rounded" 
                                                width={150}/>
                        
                                            </div>
                                            <div className="col-md-5"
                                            >
                                                <h5 className="card-title"
                                                      style={{
                                                        color: "#472f17",
                                                        letterSpacing: "8px",
                                                        wordSpacing: "8px",
                                                        fontSize: "18px",
                                                      }}
                                                >{product.product_name}</h5>
                                            </div>
            
                                            <div className="col-md-2">
                                                <div className="input-group">
                                                    <button className="btn btn-outline-secondary btn-sm" type="button"
                                                    onClick={()=>QuantityDecrease(product.product_id)}
                                                    style={{
                                                        backgroundColor: '#f1ede1', 
                                                        color: '#472f17', 
                                                        border: 'none'
                                                      }}
                                                    >-</button>
                                                    <input style={{ "maxWidth": "100px" }} type="text" className="form-control  form-control-sm text-center quantity-input"
                                                    value={Product_Quantity[product.product_id]}
                                                    readOnly
                                                    />
                                                    <button className="btn btn-outline-secondary btn-sm" type="button"
                                                    onClick={() => QuantityIncrease(product.product_id)}
                                                    style={{
                                                        backgroundColor: '#f1ede1', 
                                                        color: '#472f17', 
                                                        border: 'none'
                                                      }}
                                                    >+</button>
                                                </div>
                                            </div>

                                            <div className="col-md-2 text-end">
                                            <p className="fw"
                                                    style={{
                                                        color: '#472f17',
                                                        letterSpacing: '8px',
                                                        wordSpacing: '8px',
                                                        fontSize: '17px'
                                                    }}
                                            >{(product.product_price * Product_Quantity[product.product_id]).toFixed(2)} RON</p>
                                            
                                            <button 
                                                className="btn" 
                                                onClick={() => Deletefrom_Cart(product.product_id)}
                                                style={{ border: 'none', padding: '0', backgroundColor: 'transparent' }}
                                            >
                                                <img 
                                                    src={Media.remove_icon}  
                                                    alt="Delete"  
                                                    width={45}  
                                                    height={45}
                                                    className="delete-icon"
                                                />
                                            </button>
                                        </div>
                                            <hr style={{ 
                                                borderColor: '#472f17',  
                                                borderWidth: '1px',  
                                                margin: '10px 0'  
                                            }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    }

                    <div className="text-start mb-4">
                        <Link to="/" className="btn btn-outline-primary"
                                style={{
                                    backgroundColor: '#D8C7BF',
                                    color: '#472f17',
                                    fontSize: '21.5px',
                                    letterSpacing: '5px',
                                    wordSpacing: '1.25px',
                                    padding: '12px 24px',
                                    border: 'none'
                                }}>
                            <i className="bi bi-arrow-left me-2"></i>CONTINUE SHOPPING
                        </Link>
                    </div>
                </div>
                <div className="col-lg-4">

                    <div className="card cart-summary"
                      style={{
                        marginBottom: '40px',
                        borderRadius: '8px', 
                        overflow: 'hidden'    
                      }}
                    >
                        <div className="card-body">
                            <h5 className="card-title mb-4"
                                        style={{
                                            color: '#472f17', 
                                            letterSpacing: '10px', 
                                            wordSpacing: '10px', 
                                            fontSize: '25px'
                                        }}
                            >ORDER SUMMARY</h5>
                            <div className="d-flex justify-content-between mb-3">
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '8px', 
                                                    wordSpacing: '8px', 
                                                    fontSize: '18px'
                                                }}
                                >Subtotal</span>
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '8px', 
                                                    wordSpacing: '8px', 
                                                    fontSize: '18px'
                                                }}>{total.toFixed(2)} RON
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '8px', 
                                                    wordSpacing: '8px', 
                                                    fontSize: '18px'
                                                }}
                                >Shipping</span>
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '8px', 
                                                    wordSpacing: '8px', 
                                                    fontSize: '18px'
                                                }}
                                >{total=== 0 ? 0.0 : shipping_price.toFixed(2)} RON</span>
                            </div>
                            <hr style={{ marginTop: '24px', marginBottom: '24px' }} />
                            <div className="d-flex justify-content-between mb-8">
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '10px', 
                                                    wordSpacing: '10px', 
                                                    fontSize: '25px'
                                                }}
                                >TOTAL</span>
                                <span
                                                style={{
                                                    color: '#472f17', 
                                                    letterSpacing: '8px', 
                                                    wordSpacing: '8px', 
                                                    fontSize: '25px'
                                                }}
                                >{total=== 0? 0.0: grand_total.toFixed(2)} RON</span>
                            </div>
                            <button className="btn btn-primary w-100"
                              style={{
                                marginTop: '30px',
                                marginBottom: '10px',
                                backgroundColor: '#f1ede1',
                                color: '#472f17',
                                fontSize: '21.5px',
                                letterSpacing: '5px',
                                wordSpacing: '1.25px',
                                padding: '12px 24px',
                                border: 'none'
                              }}
                            disabled ={Cart_Products.length===0} onClick={() => Navigation(`/order`)}
                            >CHECKOUT</button>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Cart;
