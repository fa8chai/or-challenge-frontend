import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from './Product';
import Spinner from 'react-spinkit';
import { setCollapsed } from '../features/appSlice';
import { useDispatch } from 'react-redux';

function CaProducts() {
    const loading = useSelector(state => state.app.loading);
    const category = useSelector(state => state.app.category);
    const products = useSelector(state => state.app.products);
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCollapsed(true))
    }, [])

    if(loading){
        return (<LoadingContainer>
            <Spinner name="line-spin-fade-loader" />
        </LoadingContainer>
        
        )
    }
    return (<CategoryProducts>
        {category ? 
            category?.products?.length > 0? category?.products?.map(product => (
                <Product product={product} addToCartbtn key={product.id} />
            ))
            :
            <p>{`No Products in ${category.title}.`}</p>
        :
            products?.length > 0? products?.map(product => (
                <Product product={product} addToCartbtn key={product.id} />
            ))
            :
            <p>No Products.</p>
        }
        
    </CategoryProducts>)
}
const CategoryProducts = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    margin: auto;
    margin-top: 120px;
`;
const LoadingContainer = styled.div`
    margin-top: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
export default CaProducts
