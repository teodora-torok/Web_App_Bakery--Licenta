import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { getProduct_Details } from '../../service/Products_Service';
import { toast } from 'react-toastify';
import './Product_Description.css';
import {Media} from '../../assets/assets';
import { ContextStore } from '../../context/Context_Store';

const Product_Description = () => {
    const {product_id} = useParams();
    const {QuantityIncrease} = useContext(ContextStore);
    const Navigation= useNavigate();
//api call

    const[data, setData]= useState({});

    useEffect(() => {
        const Load_ProductDescription= async () => {
            try {
                const ProductData= await getProduct_Details(product_id);
                setData(ProductData);
            } catch(error) {
                toast.error('An error occured while displaying the product description.');
            }
        }
        Load_ProductDescription();
    }, [product_id]);

    const Add_toCart =() => {
        QuantityIncrease(data.product_id);
        Navigation('/cart');
    }

  return (
    <section className="py-5">
    <div className="container px-4 px-lg-5 my-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={data.product_imageUrl} alt="..." /></div>
            <div className="col-md-6">
                <div className="small mb-1">Category: {data.product_category} 
                </div>

                <h1 className="display-5 fw-bolder">{data.product_name}</h1>
                <div className="fs-5 mb-5">
                    <span>{data.product_price} RON</span>
                </div>
                <p className="lead">{data.product_description}</p>
                <div className="d-flex">
                    <button className="button" type="button" onClick={Add_toCart}>
                    <img
                    src={Media.addtocart}
                    alt=""
                    style={{width: "65px", height: "65px", backgroundColor: "transparent" }}
                    />
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Product_Description;