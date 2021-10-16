import React, { useContext } from 'react';
import Categories from './Categories';
import ProductList from './ProductList';

function Home() {
    return (
        <>
          <Categories />
          <ProductList />
        </>
    )
}

export default Home;
