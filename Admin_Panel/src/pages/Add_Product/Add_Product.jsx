import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import './Add_Product.css';
import axios from 'axios';
import { add_product } from '../../service/Product_Service';
import { toast } from 'react-toastify';



const Add_Product = () => {
    const [Product_Image, setProduct_Image]= useState(false);
    const [Product_Data, setProduct_Data]= useState({
        product_name:'',
        product_description:'',
        product_price:'',
        product_category:'',
    });

const onChange_Handler= (event)=> {
    const name= event.target.name;
    const value= event.target.value;
    setProduct_Data(Product_Data=> ({...Product_Data, [name]: value}));
}

const onSubmit_Handler= async (event)=> {
    event.preventDefault();
    if(!Product_Image) {
        toast.error('Please upload an image for the product.');
        return;
    }
    try{
        await add_product(Product_Data, Product_Image);
        toast.success('The product was uploaded with success.');
        setProduct_Data({product_name:'', product_description:'', product_category:'', product_price:''});
        setProduct_Image(null);
    } catch(error) {
        toast.error('An error occured while adding the product.');
    }
}

  return (
<div className="general_container">
  <div className="row ">
    <div className="card ">
      <div className="form_container">
        <h2 className="form_title">ADD NEW PRODUCT</h2>
        <form onSubmit={onSubmit_Handler}>

          {/*Incarcare imagine produs*/}
          <div className="mb-3">
            <label htmlFor="product_image" className="form-label">Upload Image
            <img src={Product_Image ? URL.createObjectURL(Product_Image) : assets.upload_image} alt="" width={98} 
            style={{ marginTop: '10px', marginLeft: '20px' }} />
            </label>
            <input type="file" className="form-control" id="product_image" hidden onChange={(e)=> setProduct_Image(e.target.files[0])} />
          </div>

          {/*Nume produs*/}
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">Product Name</label>
            <input type="text" className="form-control" id="product_name" required name='product_name' onChange={onChange_Handler} value={Product_Data.product_name}/>
          </div>
          
          {/*Descriere produs*/}
          <div className="mb-3">
            <label htmlFor="product_description" className="form-label">Product Description</label>
            <textarea className="form-control" id="product_description" rows="5" required name= 'product_description' onChange={onChange_Handler} value={Product_Data.product_description}></textarea>
          </div>

          {/*Categorie produs*/}
          <div className="mb-3">
            <label htmlFor="product_category" className="form-label">Product Category</label>
            <select name="product_category" id="product_category" className='form-control' onChange={onChange_Handler} value={Product_Data.product_category}>
                <option value="">Click to choose a category 
                </option>
                <option value="Biscuits">Biscuits</option>
                <option value="Bread">Bread</option>
                <option value="Cake">Cake</option>
                <option value="Cheesecake">Cheesecake</option>
                <option value="Croissants">Croissants</option>
                <option value="Cupcakes">Cupcakes</option>
                <option value="Pies">Pies</option>
                <option value="Pretzels">Pretzels</option>
            </select>
          </div>

          {/*Pret produs*/}
          <div className="mb-3">
            <label htmlFor="product_price" className="form-label">Product Price</label>
            <input type="number" name="product_price" id="product_price" className='form-control' onChange={onChange_Handler} value={Product_Data.product_price}/>
          </div>
          <button type="submit" className="btn btn-custom"  
          style={{ color: '#472f17', fontFamily: 'Impact, Haettenschweiler, Arial, sans-serif' }}
          >Save Product
          <img src= {assets.save} alt="" width= {45} height={45}/>
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
  )
}

export default Add_Product;