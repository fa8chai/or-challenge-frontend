import { React, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios from '../axios';
import { setUser } from '../features/appSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';


function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();

    const [error, setError] = useState('');
    const signUp = (e) => {
        e.preventDefault();
        axios.post('/users/signup/', { email: email, password: password, name:name})
            .then(res => {
                if (res.data.success) {
                    setEmail('');
                    setPassword('');
                    setName('');
                    dispatch(setUser({
                        name: res.data.name,
                        email: res.data.email
                    }))
                    history.push("/");
                }else {
                    setError('Error: User Not Created.')
                }
            })
            .catch(err => {
                setError('Error: User exists.')
            });
    }
    return (<SignupContainer>
        <form>
            <h1>Sign Up</h1>
            <p>{error}</p>
            <input onChange={(e) => setName(e.target.value)} placeholder='Name' value={name} />
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} />
            <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' value={password} />
            <Button onClick={signUp}>Sign Up</Button>
        </form>
    </SignupContainer>)
}
const SignupContainer = styled.div`
    margin-top: 100px;


    > form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        width: 60%;
        > h1 {
            margin-bottom: 10px;
        }
        > input {
            padding: 15px;
            border: 1px solid gray;
            outline: none;
            border-radius: 3px;
            width: 100%;
            margin-bottom: 5px;
        }
        > button {
            background-color: purple;
            color: white;
            :hover {
                opacity: 0.9;
                background-color: purple;
                color: white;
            }
        }

        @media(max-width: 768px) {
            > form {
                width: 80%;
            }
        }
    }
`;
export default Signup
