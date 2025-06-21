import React, { useContext } from 'react';
import { ContextStore } from '../../context/Context_Store';
import Product_Item from '../Product_Item/Product_Item';

const Display_Products = ({product_category, search_word}) => {

  const {Products_List}= useContext(ContextStore);
  const Products_Filter= Products_List.filter(product=> (
    (product_category==='All' || product.product_category===product_category) && 
    product.product_name.toLowerCase().includes(search_word.toLowerCase())
  ));
  return (
    <div className="container">
      <div className="row">
        {Products_Filter.length> 0 ? (
          
        Products_Filter.map((product, index)=> (
          <Product_Item key={index} 
          product_name={product.product_name} 
          product_description={product.product_description}
          product_id={product.product_id}
          product_imageUrl={product.product_imageUrl}
          product_price={product.product_price}
          />
        ))

        ):(
          <div className ="text-center mt-4">
            <h4> No products were found. </h4>
          </div>
        )
        }
      </div>
    </div>
  )
}

export default Display_Products;