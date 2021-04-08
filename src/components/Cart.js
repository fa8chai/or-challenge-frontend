import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Product from './Product';
import { Button } from '@material-ui/core';
import getSymbolFromCurrency from 'currency-symbol-map';
import { Link } from 'react-router-dom';
import { groupBy } from '../functions.js';

function Cart() {
    const cart = useSelector(state => state.app.cart);
    const currency = useSelector(state => state.app.currency);
    const getCartTotal = (cart) => 
        cart?.reduce((amount, item) => Number(item.price) + amount, 0);


    const grouped = groupBy(cart, product => product.id);
    const groupedProducts = Array.from(grouped).map(gr => ({
        id:gr[0],
        products: gr[1]
    }));
    return (<CartContainer>
        <ProductsContainer>
            {groupedProducts.map(productsId => (
                    <Product 
                    key={productsId.id}
                    product={productsId.products[0]}
                    num={productsId.products.length}
                    addToCart={false}
                />
                
            ))}
        </ProductsContainer>
        {cart.length > 0 ? 
            <Subtotal>
            <p>Subtotal ({ cart.length } items) : <strong>{`$${getCartTotal(cart)}`}</strong></p>
            <Link to="/checkout"><Button>Proceed to Checkout</Button></Link>
            </Subtotal>
            :
            <p>You have't added any products yet.</p>
        }
    </CartContainer>)
}
const Subtotal = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #1d1d1d;
    color: #f1f1f1;
    padding: 8px;
    position: fixed;
    top: 50px;
    right: 0px;
    @media(max-width: 425px) {
        width: 70%
    }
    > a {
        text-decoration: none;
    }
    > a > button {
        background-color: purple;
        color: white;
        width: 100%;
        margin: 10px;
        :hover {
            opacity: 0.9;
            background-color: purple;
            color: white;
        }
    }

`;
const CartContainer = styled.div`
    margin: 20px;
    margin-top: 60px;
`;
const ProductsContainer = styled.div`
    margin-top: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export default Cart
