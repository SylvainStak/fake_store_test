import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import Container from '@mui/material/Container';
import { useQuery } from 'react-query';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import CircularProgress from '@mui/material/CircularProgress';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';
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
          <Container maxWidth="xs" className="product_info_container">
            <h2 className="product_title">{data.data.title}</h2>
            <h4 className="product_category">Category: {data.data.category}</h4>
            <div className="product_image_container">
              <img src={data.data.image} className="product_image" width="300" height="300" alt={data.data.alt} />
            </div>
            <Grid container spacing={2} className="product_showcase_container">
              <Grid item md={4} sm={12} xs={12}>
                <h2>$ {data.data.price}</h2>
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Rating name="read-only" value={data.data.rating.rate} precision={0.1} readOnly />
                {data.data.rating.count} <PersonIcon className="reviewIcon" />
              </Grid>
            </Grid>
            <p className="product_description">{data.data.description}</p>
          </Container>
          )}
        </>
    )
}

export default ProductInfo;
