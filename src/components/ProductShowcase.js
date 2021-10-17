import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Rating from '@mui/material/Rating';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import '../styles/ProductShowcase.css';

function ProductShowcase({ product }) {
    return (
        <>
          <Link
            to={`/fake_store_test/product/${product.id}`}
            className="product_showcase_link"
          >
            <Paper
              elevation={3}
              className="product_showcase"
            >
              <Grid container spacing={2} className="product_showcase_container">
                <Grid item md={2} sm={12} xs={12}>
                  <img src={product.image} className="product_image" width="100" height="100" alt={product.title}/>
                </Grid>
                <Grid item md={8} sm={12} xs={12}>
                  <p>{product.title}</p>
                  <p className="product_price">${product.price}</p>
                </Grid>
                <Grid item md={2} sm={12} xs={12}>
                  <Rating name="read-only" value={product.rating.rate} precision={0.1} readOnly />
                  {product.rating.count} <PersonIcon className="reviewIcon" />
                </Grid>
              </Grid>
            </Paper>
          </Link>
        </>
    )
}

export default ProductShowcase;
