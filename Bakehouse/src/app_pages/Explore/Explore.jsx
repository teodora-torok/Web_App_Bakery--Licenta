import React, { useState } from 'react';
import Display_Products from '../../app_components/Display_Products/Display_Products';
import './Explore.css';
import { Media } from '../../assets/assets';

const Explore = () => {
  const [product_category, setProd_Category] =useState('All');
  const [search_word, setSearch_Word]= useState('');
  return (
  <>
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <from onSubmit={(e)=> e.preventDefault()}>
            <div className="input-group mb-3">
              <select className='form-select mt-2' style={{'maxWidth': '200px'}}
              onChange={(e) => setProd_Category(e.target.value)}
              defaultValue="">
              <option value="" disabled hidden>
                Category
              </option>
              <option value ="All">All products</option>
                <option value ="Biscuits">Biscuits</option>
                <option value ="Bread">Bread</option>
                <option value ="Cake">Cake</option>
                <option value ="Cheesecake">Cheesecake</option>
                <option value ="Croissants">Croissants</option>
                <option value ="Cupcakes">Cupcakes</option>
                <option value ="Pies">Pies</option>
                <option value ="Pretzels">Pretzels</option>
              </select>
              <input type="text" className='form-control mt-2' placeholder='Search for a product' 
              onChange={(e)=> setSearch_Word(e.target.value)} value={search_word}/>

              <button className='btn mt-2' type='submit'>
                <img 
                  src={Media.search} 
                  alt="Search" 
                  style={{ width: '50px', height: '50px' }}
                />
              </button>

            </div>
          </from>
        </div>
      </div>
    </div>
    <Display_Products product_category={product_category} search_word={search_word} />
  </> 

  )
}

export default Explore;