import { IconButton } from '@material-ui/core';
import React, { useRef } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from './Product';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

function Products() {
    const products = useSelector(state => state.app.products);
    const ref = useRef(null);
    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };
    return (<ProductsContainer>
        <ProductsDiv ref={ref}>
        {products?.map(product => (
            <Product key={product.id} product={product} addToCartbtn={true}/>
        ))}
        </ProductsDiv>
        { products && 
        <Icons>
            <IconButton onClick={() => scroll(-250)}><ArrowBackIosIcon /></IconButton>
            <IconButton onClick={() => scroll(250)}><ArrowForwardIosIcon /></IconButton>
        </Icons>
        }
    </ProductsContainer>)
}
const Icons = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: auto;
    > .MuiIconButton-root {
        background-color: white;
        color: #1d1d1d;
        :hover {
            background-color: #1d1d1d;
            color: white;
        }
        > span > .MuiSvgIcon-root {
            font-size: 40px;
        }
    }
`;
const ProductsDiv = styled.div`
    display: flex;
    align-items: center;
    width: 90%;
    scroll-behavior: smooth;
    margin: auto;
    margin-top: 100px;
    overflow: scroll;
    ::-webkit-scrollbar {
    width: 0;
    }
`;
const ProductsContainer = styled.div`
    position: relative;
    text-align: center;
`;
export default Products
