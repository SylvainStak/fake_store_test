import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AppContext } from './AppContext';
import Home from './components/Home';
import Error404 from './components/Error404';
import ProductInfo from './components/ProductInfo';

function App() {
  const appUri = '/fake_store_test';
  const queryClient = new QueryClient()
  const [selectedCategory, setSelectedCategory] = useState('');
  const [pagination, setPagination] = useState(1);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContext.Provider
          value={{
            selectedCategory,
            setSelectedCategory,
            pagination,
            setPagination
          }}
        >
          <Router>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path={appUri} exact component={Home} />
                <Route path={`${appUri}/product/:productId`} exact component={ProductInfo} />
                {/* 404 REDIRECT */}
                <Route component={Error404} />
              </Switch>
          </Router>
        </AppContext.Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
