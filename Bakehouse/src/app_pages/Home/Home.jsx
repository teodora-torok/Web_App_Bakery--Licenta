import React, { useState } from 'react';
import Header from '../../app_components/Header/Header';
import Discover_Menu from '../../app_components/Discover_Menu/Discover_Menu';
import Display_Products from '../../app_components/Display_Products/Display_Products';


const Home = () => {
  const [product_category, setProd_Category]= useState('All');
  return (
    <main className='container'>
      <Header />
      <Discover_Menu product_category={product_category} setProd_Category={setProd_Category}/>
      <Display_Products product_category={product_category} search_word={''}/>
    </main>
  )
}

export default Home;