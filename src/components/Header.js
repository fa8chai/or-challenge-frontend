import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MenuIcon from '@material-ui/icons/Menu';
import { setCollapsed, setCurrency } from '../features/appSlice';
import { Badge, IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

function Header() {
    const collapsed = useSelector(state => state.app.collapsed);
    const dispatch = useDispatch();
    const cart = useSelector(state => state.app.cart);
    const currency = useSelector(state => state.app.currency);

    return (<HeaderContainer>
        {collapsed &&
            <HeaderLeft>
                <IconButton children={ 
                    <Badge color="secondary" variant={cart.length > 0 ? 'dot' : 'none'}>
                        <MenuIcon onClick={() => dispatch(setCollapsed(false))} />
                    </Badge>
                    } 
                />
            </HeaderLeft>
        }
        <HeaderCenter>
            <Link to='/' onClick={() => dispatch(setCollapsed(true))}>Logo</Link>
        </HeaderCenter>
        <HeaderRight>
            <p>{currency}</p>
        </HeaderRight>
    </HeaderContainer>)
}
const HeaderRight = styled.div`
    margin-right: 5px;
    font-weight: 400;
`;
const HeaderCenter = styled.div`
    > a {
        color: inherit;
        text-decoration: inherit
    }
`;
const HeaderContainer = styled.div`
    background-color: #1d1d1d;
    color: #ADADAD;
    display: flex ;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 48px;
    z-index: 1;
`;
const HeaderLeft = styled.div`
    >button>span>span>.MuiSvgIcon-root {
        color: #ADADAD !important;
    }
`;



export default Header
