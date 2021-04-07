import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { addToCart, apiGetProduct, fetchPrice, remove, removeFromCart } from '../features/appSlice';
import CurrencyFormat from 'react-currency-format';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import getSymbolFromCurrency from 'currency-symbol-map';


function Product({ product, addToCartbtn, num }) {
    const dispatch = useDispatch();
    const currency = useSelector(state => state.app.currency);
    const priceData = useSelector(state => state.app.priceData);
      
    useEffect(() => {
        const data = {
            currency: currency,
            product: product,
        }
        dispatch(fetchPrice(data))
    }, [currency, product])
    return (<ProductContainer>
        {console.log(priceData)}
        <Link onClick={() => dispatch(apiGetProduct(product.id))} to={`/products/${product.id}`}>
            <img
                alt={product.title}
                src={product.images[0].image}
            />
            <h3>{product.title}</h3>
            <h4>{product.desc.length > 20 ? `${product.desc.slice(0, 20)}...` : product.desc}</h4>
            <p>  
                {
                    priceData ? <CurrencyFormat value={priceData.price} displayType={'text'} thousandSeparator={true} prefix={priceData.symbol} />
                    :
                    <CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={getSymbolFromCurrency(product.price_currency)} />
                }
            </p>
            </Link>
            {num > 0 && 
                <div>
                    <RemoveIcon onClick={() => dispatch(remove(product))} />
                    <h4 className='num'>{num}</h4>
                    <AddIcon onClick={() => dispatch(addToCart(product))} />
                </div>
            }
            {addToCartbtn ? 
                <Button className='add' onClick={() => dispatch(addToCart(product))}>Add to cart</Button>
                :
                <>

                <Button className='remove' onClick={() => dispatch(removeFromCart(product))}>Remove</Button>
                </>
            }
        
    </ProductContainer>)
}
const ProductContainer = styled.div`
    margin: 0px 10px;
    width: 250px;
    height: 350px;
    padding: 10px;
    > a {
        text-decoration: none;
        color: inherit;
        width: inherit;
    }
    > .add {
        width: 90%;
        margin: auto;
        margin-top: 10px;
        color: white;
        background-color: purple;
        opacity: 0;
        :hover {
            color: purple;
            background-color: white;
        }
    }
    > .remove {
        background-color: #1d1d1d;
        color: #f1f1f1;
        :hover {
            background-color: #1d1d1d;
            color: #f1f1f1;
            opacity: 0.9;
        }
    }
    :hover {
        > .add {
            opacity: 1;
        }
    }
    > a > img {
        width: inherit;
        max-width: 400px;
        object-fit: cover;
    }
    > a > h3 {
        font-weight: 500;
        text-transform: capitalize;
    }
    > a > h4 {
        font-weight: 500;
        margin-top: 10px;
        color: #1d1d1d;
    }
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 20px;
    }
    > div > .num {
        color: purple;
        margin: 10px;
    }
    > div {
        .MuiSvgIcon-root {
            cursor: pointer;
        }
    }
    > a > p {
        margin-top: 8px;
        font-weight: bold;
    }
    @media(max-width: 768px) {
        > .add {
            opacity: 1;
        }
    }
    @media(max-width: 425px) {
        width: 200px;
    } 
`;
export default Product
