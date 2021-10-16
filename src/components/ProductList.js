import React, { useContext } from 'react';
import './ProductList.css';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import { AppContext } from '../AppContext';

function ProductList() {
  const { selectedCategory } = useContext(AppContext);
  const fetchProducts = () => axios(`https://fakestoreapi.com/products${selectedCategory?'/category/'+selectedCategory:''}`);
  const { isLoading, error, data } = useQuery(`products_${selectedCategory}`, fetchProducts, {staleTime: 100000, cacheTime: 100000});

  const renderProducts = () => data && data.data.map(product => (
    <div key={product.id}>
      <Paper
        elevation={3}
      >
        {product.title}
      </Paper>
    </div>
  ));

  return (
    <>
      {console.log(data?.data)}
      <CssBaseline />
      {error && <div>Something went wrong ... try reloading (F5)</div>}
      <h1 className="productlist_title">Product List</h1>
      {isLoading ? (
          <div className="productlist_loader_container">
            <CircularProgress />
          </div>          
          ) : (
          <Container maxWidth="sm">
            {renderProducts()}
          </Container>
        )}
    </>
  )
}

export default ProductList;
