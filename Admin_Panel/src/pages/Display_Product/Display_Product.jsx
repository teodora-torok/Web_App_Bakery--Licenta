import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Display_Product.css';
import {assets} from '../../assets/assets';
import { delete_product, getProduct_List } from '../../service/Product_Service';


const Display_Product = () => {
  const[Product_List, setProduct_List]= useState([]);
  const getList= async()=> {
    try {
      const data= await getProduct_List();
      setProduct_List(data);
    } catch(error) {
      toast.error('An error occured while reading the products.');
    }
  }

  const Delete_Product= async(productID)=> {
    try {
      const successDeletion= await delete_product(productID);
      if(successDeletion) {
        toast.success('Product deleted.');
        await getList();
      }
      else {
        toast.error('An error occured while deleting the product.');
      }
    } catch(error) {
      toast.error('An error occured while deleting the product.');
    }
  }
  

 useEffect(() => {
  getList();
 }, []);

  return (
    <div className="py-5 row justify-content-center">
      <div className= "col-11 card">
        <table className='products_table'>
          <thead>
            <tr>
              <th>PRODUCT IMAGE</th>
              <th>PRODUCT NAME</th>
              <th>PRODUCT CATEGORY</th>
              <th>PRODUCT PRICE</th>
              <th>DELETE PRODUCT</th>
            </tr>
          </thead>
          <tbody>
            {
              Product_List.map((product, index)=>{
                return (
                  <tr key={index}>
                    <td>
                      <img src={product.product_imageUrl} alt="" height={48} width={48} />
                    </td>
                    <td>{product.product_name}</td>
                    <td>{product.product_category}</td>
                    <td>{product.product_price} RON</td>
                    
                    <td className="delete_icon">
                      <img 
                        src={assets.delete_product} 
                        height={35} 
                        width={35} 
                        onClick={() => Delete_Product(product.product_id)} 
                      />
                    </td>

                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Display_Product;