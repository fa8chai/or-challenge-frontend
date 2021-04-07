import { createSlice } from '@reduxjs/toolkit';
import axios from '../axios';
import { getMainCategories } from '../functions';
import getSymbolFromCurrency from 'currency-symbol-map';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    user: null,
    collapsed: true,
    cart: [],
    currency: localStorage.getItem('currency') || 'USD' ,
    category: null,
    product: null,
    products: null,
    categories: null,
    loading: false,
    loadingCategories: false,
    mainCategories: null,
    priceData: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.mainCategories = getMainCategories(state.categories);
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    addToCart: (state, action) => {
      state.cart.push(action.payload);

    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload.id );

    },
    remove: (state, action) => {
      var index = state.cart.findIndex(p => p.id == action.payload.id );
      state.cart.splice(index, 1); 

    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPriceCurrency: (state, action) => {
      state.priceData = action.payload
    }
  },
});

export const {setPriceCurrency, setCart, setUser, removeFromCart, setLoading, setCollapsed, addToCart, setProduct, setCategory, remove, setCurrency, setProducts, setCategories } = appSlice.actions;

export  const fetchPrice = (data) => dispatch => {
  const BASE_URL = `https://free.currconv.com/api/v7/convert?q=${data.product.price_currency}_${data.currency}&compact=ultra&apiKey=8ebfadcff757e397a4ba`
  const symbol = getSymbolFromCurrency(data.currency);
  fetch(BASE_URL)
      .then(res => res.json())
      .then(jres => {
          let e = jres[data.product.price_currency+'_'+data.currency]*data.product.price
          dispatch(setPriceCurrency({
            symbol: symbol,
            price: e.toFixed(2),
          }))
      })
      .catch(err => alert(err))
}

export const apiGetProducts = () => dispatch => {
  dispatch(setLoading(true))
  axios.get('/app/api/get_products/')
    .then(res => {
      dispatch(setProducts(res.data))
      dispatch(setLoading(false))
    })
    .catch(err => console.log(err))
};
export const apiGetCategories = () => dispatch => {
  dispatch(setLoading(true))
  axios.get('/app/api/get_categories/')
    .then(res => {
      dispatch(setCategories(res.data))
      dispatch(setLoading(false))
    })
    .catch(err => console.log(err))
};

export const apiGetCategory = (id) => dispatch => {
  dispatch(setLoading(true));
  axios.get(`/app/api/get_category/${id}/`)
    .then(res => {
      dispatch(setCategory(res.data));
      dispatch(setLoading(false));
    })
    .catch(err => console.log(err))
};
export const apiGetProduct = (id) => dispatch => {
  dispatch(setLoading(true));
  axios.get(`/app/api/get_product/${id}/`)
    .then(res => {
      dispatch(setProduct(res.data));
      dispatch(setLoading(false));
    })
    .catch(err => console.log(err))
};
export const apiPostOrder = (data) => dispatch => {
  data.orders.forEach(order => {
    let orderObject = {
      order_user: {email:data.email},
      product: order.products[0],
      quantity: order.products.length,
      }
    axios.post('/app/api/order/', {order_user: orderObject.order_user, product: orderObject.product, quantity: orderObject.quantity})
    .then(res => {
      console.log(res);
      dispatch(setCart([]))
    })
    .catch(err => console.log(err))
    })
    
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCollapsed = state => state.app.collapsed;

export default appSlice.reducer;
