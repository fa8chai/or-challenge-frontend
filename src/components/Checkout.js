import {React, useState} from 'react';
import styled from 'styled-components';
import { groupBy } from '../functions.js';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';
import { apiPostOrder } from '../features/appSlice';
import { useHistory } from 'react-router-dom';

function Checkout() {
    const cart = useSelector(state => state.app.cart);
    const dispatch = useDispatch();
    const grouped = groupBy(cart, product => product.id);
    const user = useSelector(state => state.app.user);
    const history = useHistory();
    
    const groupedProducts = Array.from(grouped).map(gr => ({
        id:gr[0],
        products: gr[1]
    }));

    const [email, setEmail] = useState(user?.email);
    const handleForm = (e) => {
        e.preventDefault();
        dispatch(apiPostOrder({
            orders: groupedProducts,
            email: email,
        }))
        history.push("/");
    }
    
    return (<CheckoutContainer>
        <form>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' /> 
            {groupedProducts.map(productsId => (
                <div>
                   <input value={productsId.products[0].title} disable={true} />
                   <input type='number' value={productsId.products.length} disable={true} />
               </div>
            ))}
            <Button onClick={handleForm}>Order</Button>
        </form>
    </CheckoutContainer>)
}
const CheckoutContainer = styled.div`
    margin-top: 100px;
    > form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 60%;
        margin: auto;
        > input, > div > input {
            width: 100%;
            outline: none;
            border: solid 1px gray;
            border-radius: 3px;
            margin: 5px;
            padding: 15px;
        }
        > div {
            width: 100%;
            display: flex;
            align-items: center;
            > input {
                background-color: #ADADAD;
                color: gray
            }
        }
        > button {
            color: white;
            background-color: purple;
            margin-top: 15px;

            :hover {
                color: white;
                background-color: purple;
                opacity: 0.9;
            }
        }
        @media(max-width: 768px) {
            width: 90%;
        }
    }
`;
export default Checkout
