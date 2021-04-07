import {React, useEffect, useState} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Spinner from 'react-spinkit';
import { Button } from '@material-ui/core';
import { addToCart } from '../features/appSlice';
import { useDispatch } from 'react-redux';
import CurrencyFormat from 'react-currency-format';
import getSymbolFromCurrency from 'currency-symbol-map';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";


function ProductPage() {
    const loading = useSelector(state => state.app.loading);
    const product = useSelector(state => state.app.product);
    const priceData = useSelector(state => state.app.priceData);

    const dispatch = useDispatch();
    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState(null);
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (priceData) {
            setSymbol(priceData.symbol);
            setPrice(priceData.price);
        }
        if (product) {
            let data = []
            product.images.forEach(image => {
                data.push({
                    original: image.image,
                    thumbnail: image.avatar
                })
            })
            setImages(data);
        }
        
    }, [priceData, product])

    return (<ProductPageContainer>
        {loading ? 
        <Spinner name="ball-spin-fade-loader" />
        :
        <>
        <ProductGallery>
            <ImageGallery showPlayButton={false} items={images} />
        </ProductGallery>
        <ProductInfo>
            <h2>{product?.title}</h2>
            <h4>{product?.desc}</h4>
            <p>  
                {
                    price ? <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={symbol} />
                    :
                    <CurrencyFormat value={product?.price} displayType={'text'} thousandSeparator={true} prefix={getSymbolFromCurrency(product?.price_currency)} />
                }
            </p>
            <Button onClick={() => dispatch(addToCart(product))}>Add to cart</Button>
        </ProductInfo>
        </>
        }
    </ProductPageContainer>)
}
const ProductPageContainer = styled.div`
    width: 98%;
    margin: auto;
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media(max-width: 768px) {
        flex-direction: column;
    }
`;
const ProductInfo = styled.div`
    flex: 4;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    margin-top: 10px;
    > h2 {
        font-weight: 500;
        margin-bottom: 30px;
    }
    > h4 {
        font-weight: 500;
        color: #1d1d1d;
    }
    > p {
        margin-top: 20px;
        font-weight: bold;
    }
    > button {
        width: 70%;
        margin: auto;
        margin-top: 50px;
        color: white;
        background-color: purple;
        :hover {
            color: purple;
            background-color: white;
            opacity: 0.9
        }
    }
`;
const ProductGallery = styled.div`
    flex: 6;
`;
export default ProductPage
