import React, { useContext } from 'react';
import '../styles/ProductList.css';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import { AppContext } from '../AppContext';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import ProductShowcase from './ProductShowcase';

function ProductList() {
  const { selectedCategory, pagination, setPagination } = useContext(AppContext);
  const fetchProducts = () => axios('https://fakestoreapi.com/products');
  const { isLoading, error, data } = useQuery('products', fetchProducts, {staleTime: 100000, cacheTime: 100000});
  const handlePagination = (event, value) => setPagination(value);
  const categoryFilter = product => selectedCategory?product.category===selectedCategory:true;
  const resultsPerPage = 4;
  const totalPages = () => Math.ceil(data.data.filter(categoryFilter).length/resultsPerPage);

  const processedData = () => {
    let rawProducts = data.data.filter(categoryFilter);
    const offset = (pagination-1)*resultsPerPage;
    const limit = offset+resultsPerPage;
    return rawProducts.slice(offset, limit);
  }

  const renderProducts = () => processedData().map(product => (
    <div key={product.id}>
      <ProductShowcase product={product} />
    </div>
  ));

  return (
    <>
      <CssBaseline />
      {error && <div>Something went wrong ... try reloading (F5)</div>}
      <h1 className="productlist_title">Products</h1>
      {isLoading ? (
          <div className="productlist_loader_container">
            <CircularProgress />
          </div>
          ) : (
          <Container maxWidth="md">
            {renderProducts()}
            <div className="productlist_pagination">
              <Stack spacing={2}>
                <Pagination page={pagination} count={totalPages()} color="primary" onChange={handlePagination} />
              </Stack>
            </div>
          </Container>
        )}
    </>
  )
}

export default ProductList;
