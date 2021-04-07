import { Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'

function Banner() {
    return (<BannerContainer>
        <img
            alt="banner"
            src="https://images.pexels.com/photos/260046/pexels-photo-260046.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        />
        <Text>
            <h3>New Era.</h3>
            <Link to="/products"><Button>Browse New Items</Button></Link>
        </Text>
    </BannerContainer>)
}
const Text = styled.div`
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    -webkit-transform: translate(-50%,-50%);
    color: #f1f1f1;
    > a  {
        color: none;
        text-decoration: none;
    }
    > a > button {
        color: #f1f1f1 !important;
        border: 3px solid #f1f1f1;
        padding: 7px 20px;
        font-size: 15px;
        text-transform: capitalize;
        width: 300px;
        :hover {
            background-color: #f1f1f1;
            color: #1d1d1d !important;
            border: 3px solid #1d1d1d;
        }
    }
    > h3 {
        text-transform: uppercase;
        margin-bottom: 30px
    }
`;
const BannerContainer = styled.div`
    position: relative;
    text-align: center;
    height: 100vh;
    > img {
        height: inherit;
        width: 100%;
        object-fit: cover;
    }
    @media(max-width: 425px) {
        height: 70vh
    }
`;
export default Banner
