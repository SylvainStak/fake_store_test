import React, { useContext } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { useQuery } from 'react-query';
import { AppContext } from '../AppContext';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ComputerIcon from '@mui/icons-material/Computer';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
import './Categories.css';

function Categories() {
  const { setSelectedCategory } = useContext(AppContext);
  const fetchCategories = () => axios('https://fakestoreapi.com/products/categories');
  const { isLoading, error, data } = useQuery('categories', fetchCategories, {staleTime: 100000, cacheTime: 100000});

  const renderCategories = () => data && data.data.map(category => (
    <div key={category}>
      <Stack direction="row" spacing={1}>
        <Chip
          icon={getCategoryIcon(category)}
          label={capitalizeName(category)}
          variant="outlined"
          color="info"
          onClick={() => setSelectedCategory(category)}
        />
      </Stack>
    </div>
  ));

  const getCategoryIcon = category => {
    let icon = <AutorenewIcon />
    switch(category) {
      case "electronics": icon = <ComputerIcon />; break;
      case "jewelery": icon = <AutoAwesomeIcon />; break;
      case "men's clothing": icon = <MaleIcon />; break;
      case "women's clothing": icon = <FemaleIcon />; break;
      default: icon = <AutorenewIcon />;
    }
    return icon;
  }

  const capitalizeName = name => name.charAt(0).toUpperCase() + name.slice(1);

  return (
      <>
        <CssBaseline />
        {error && <div>Something went wrong ... try reloading (F5)</div>}
        <h1 className="categories_title">Categories</h1>        
        {isLoading ? (
          <div className="categories_loader_container">
            <CircularProgress />
          </div>          
          ) : (
          <div className="categories_container">
            <div key="All Products">
              <Chip
                icon={<ShoppingCartIcon />}
                label={capitalizeName('All Products')}
                variant="outlined"
                color="info"
                onClick={() => setSelectedCategory('')}
              />
            </div>
            {renderCategories()}
          </div>
        )}
      </>
  )
}

export default Categories;