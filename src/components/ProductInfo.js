import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import '../styles/ProductInfo.css';

function ProductInfo(props) {
    const { match } = props;
    const fetchProductInfo = () => axios(`https://fakestoreapi.com/products/${match.params.productId}`);
    const { isLoading, error, data } = useQuery(`product_${match.params.productId}`, fetchProductInfo, {staleTime: 100000, cacheTime: 100000});

    return (
        <>
          <CssBaseline />
          {error && <div>Something went wrong ... try reloading (F5)</div>}
          <Link
            to="/fake_store_test"
            className="backtolist_link"
          >
            <Button variant="contained" color="primary"><ArrowBackIosIcon />Back to Product List</Button>
          </Link>
          {isLoading ? (
          <div className="categories_loader_container">
              <CircularProgress />
          </div>          
          ) : (
          <Container maxWidth="md" className="product_info_container">
            {data.data.title}
          </Container>
          )}
        </>
    )
}

export default ProductInfo;
