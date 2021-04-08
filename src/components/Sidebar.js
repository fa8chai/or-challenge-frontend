import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { ProSidebar, Menu, MenuItem , SidebarHeader, SidebarFooter, SidebarContent } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import { apiGetCategory, setCollapsed } from '../features/appSlice';
import { useDispatch, useSelector } from "react-redux";
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import SelectCurrency from 'react-select-currency';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))(Badge);
  

function Sidebar() {
    const [search, setSearch] = useState('');
    const collapsed = useSelector(state => state.app.collapsed);
    const categories = useSelector(state => state.app.categories);
    const cart = useSelector(state => state.app.cart);
    const currency = useSelector(state => state.app.currency);
    const user = useSelector(state => state.app.user);

    const onSelectedCurrency = (currencyAbbrev) => {
        localStorage.setItem('currency', currencyAbbrev.target.value);
        window.location.reload(false);
    }
    const dispatch = useDispatch();
    const handelForm = (e) => {
        e.preventDefault();
        //Django Search...
        alert(search);
        setSearch('');
    }

    return (<SidebarContainer>
        <ProSidebar collapsedWidth={collapsed && '0'} breakPoint={!collapsed ? 'xl' : ''} toggled='true' collapsed={collapsed}>
            <SidebarHeader>
                <SidebarHeaderContent>
                    <CurrencyContainer>
                        <SelectCurrency value={currency} onChange={onSelectedCurrency} />
                    </CurrencyContainer>
                    {user && <h3>Hello {user?.name ? user?.name : user?.email}</h3>}
                    {!user&&
                    <>
                    <Link to="/login" onClick={() => dispatch(setCollapsed(true))}><Button>Sign In</Button></Link>
                    <Link to="/signup" onClick={() => dispatch(setCollapsed(true))}><Button>Sign Up</Button></Link>
                    </>
                    }

                </SidebarHeaderContent>
            </SidebarHeader>

            <SidebarContent>
            <Menu popperArrow={true} iconShape="circle">
                <MenuItem icon={<SearchIcon />}>
                    <SidebarSearch>
                        <form onSubmit={handelForm}>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." />
                            <button type="submit"></button>
                        </form>
                    </SidebarSearch>
                </MenuItem>
                <MenuItem icon={ 
                        <StyledBadge max={20} badgeContent={cart.length} color="secondary">
                                <ShoppingCartIcon />
                        </StyledBadge>}
                >   
                    <Link to="/cart" onClick={() => dispatch(setCollapsed(true))}>
                        <CartItem>
                            Cart <ArrowForwardIcon />
                        </CartItem> 
                    </Link>
                     
                </MenuItem>
                {
                    categories?.map(category => (
                        <MenuItem  key={category.id} onClick={() => {
                                            dispatch(setCollapsed(true));
                                            dispatch(apiGetCategory(category.id))
                        }} ><Link to={`/categories/${category.title}`}>{category.title}</Link></MenuItem>
                    ))
                 }
               
            </Menu>
            </SidebarContent>
            <SidebarFooter>
                <SidebarFooterContent>
                   <IconButton children={ <CloseIcon onClick={() => dispatch(setCollapsed(true))} />} />
                </SidebarFooterContent>
            </SidebarFooter>
        </ProSidebar>
    </SidebarContainer>)
}
const CurrencyContainer= styled.div`
    > div > div > .react-autosuggest__input {
        width: 95%;
        margin: auto;
        margin-bottom: 10px;
        border: solid 1px rgb(50,50,50);
        height: 30px;
        border-radius: 3px;
        padding: 5px;
        background-color: inherit;
        color: #ADADAD;
    }
    > div > div > .react-autosuggest__suggestions-container {
        background-color: #1d1d1d;
        color: #ADADAD;
        width: 99%;
        margin: auto;
    }
    > div > div > .react-autosuggest__suggestions-container--open {
        border: solid 1px rgb(50,50,50);
        margin-top: -10px;
        > ul > li:hover {
            background-color: #1d1d1d;
            color: #f1f1f1; 
        }
    }

`;
const CartItem = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 3px;
`;
const SidebarSearch = styled.div`
    flex: 0.4;
    border: 1px solid gray;
    border-radius: 3px;
    > form > input {
        border: none ;
        outline: none ;
        padding: 10px;
        color: inherit;
        background-color: inherit;
    }
    > form > button {
        display: none ;
    }
`;
const SidebarFooterContent = styled.div`
    text-align: center;
    > .MuiIconButton-root {
        color: gray
    }
`;

const SidebarContainer = styled.div`
    height: 100vh;
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout{
        overflow: hidden;
    }
    /* Works on Firefox */
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout{
        
        scrollbar-width: thin;
        scrollbar-color: gray ;
    }
    /* Works on Chrome, Edge, and Safari */
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout::-webkit-scrollbar {
        width: 6px;
    }
    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout::-webkit-scrollbar-thumb {
        background-color: gray;
    }

    .pro-sidebar > .pro-sidebar-inner > .pro-sidebar-layout:hover {
        overflow-y: auto;
    }
    > .pro-sidebar > .pro-sidebar-inner {
    background-color: #1d1d1d;
}
`;
const SidebarHeaderContent = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;

    > a > button {
        color: white;
        background-color: purple; 
        margin-top: 10px;
        width: 100%;
        :hover{
            background-color: purple;
            opacity: 0.8;
        }
    }
    > a {
            color: inherit;
            text-decoration: none;
            width: 100%;
        }
`;
export default Sidebar
