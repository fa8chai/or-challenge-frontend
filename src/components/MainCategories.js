import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { apiGetCategory } from '../features/appSlice';
import Spinner from 'react-spinkit';


function MainCategories() {
    const mainCategories = useSelector(state => state.app.mainCategories);
    const loading = useSelector(state => state.app.loading);
    const dispatch = useDispatch();

    return (<MainCategoriesContainer>
        {loading &&
        <Spinner name="line-spin-fade-loader" />
        }
        {mainCategories&&mainCategories?.map(category => (
            <Link onClick = {() => dispatch(apiGetCategory(category.id))} to={`/categories/${category.title}`} key={category.id}>
                 <img 
                    alt={category.title}
                    src={category.image}
                />
                <div>
                    <h3>{category.title}</h3>
                </div>
            </Link>
        ))}
    </MainCategoriesContainer>)
}
const MainCategoriesContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    > a {
        flex: 1;
        position: relative;
        text-align: center;
        color: #f1f1f1;
        height: 200px;
    }
    > a > div {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(50, 50, 50, 0.5);
        display: grid;
        align-content: center
    }
    > a > h3 {
        text-align: center;
    } 
    > a > img {
        height: 200px;
        width: 100%;
        object-fit: cover;
    }
    @media(max-width: 425px) {
        flex-direction: column;
    }
`;
export default MainCategories
