import {React, useEffect} from 'react';
import styled from 'styled-components';
import './App.css';
import Header from './components/Header';
import Cart from './components/Cart';
import Login from './components/Login';
import Banner from './components/Banner';
import Sidebar from './components/Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CaProducts from './components/CaProducts';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { apiGetCategories, apiGetProducts } from './features/appSlice';
import ProductPage from './components/ProductPage';
import Checkout from './components/Checkout';
import Signup from './components/Signup';
import MainCategories from './components/MainCategories';
import Products from './components/Products';

function App() {
  const category = useSelector(state => state.app.category);
  const products = useSelector(state => state.app.products);
  const cart = useSelector(state => state.app.cart);
  const user = useSelector(state => state.app.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(apiGetProducts())
    dispatch(apiGetCategories())
  },[])
  
  return (
  <Router>
    <AppContainerFlex>
        <Sidebar />

        <AppContainer>
          <Header />
          <Switch>
            <Route path="/cart">
              <Cart />
            </Route>

            {category&&
             <Route path="/categories/:category">
              <CaProducts />
            </Route> 
            }
           

            <Route path="/products/:id">
              <ProductPage />
            </Route>

            <Route path="/products">
              <CaProducts
               />
            </Route>
            {cart.length>0&&
            <Route path="/checkout">
              <Checkout />
            </Route>
            }
         
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
         
          <Route path="/">
            <Banner />
            <MainCategories />
            <Products />
          </Route>

          </Switch>
        </AppContainer>

    </AppContainerFlex>
  </Router>
    )}
const AppContainer = styled.div`
  width: 100%;
`;
const AppContainerFlex = styled.div`
  display: flex;
  height: 100%;
`;

export default App;
