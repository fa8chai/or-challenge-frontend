import { React, useState } from 'react';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import axios, { djangoUrl } from '../axios';
import { setUser } from '../features/appSlice';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const dispatch = useDispatch();

    const signIn = (e) => {
        e.preventDefault();
        console.log('sign in');
        axios.post('/users/signin/', { email: email, password: password})
            .then(res => {
                if(res.data.url){
                    setEmail('');
                    setPassword('');
                    history.push("/");
                    var win = window.open(djangoUrl+res.data.url, '_blank');
                    win.focus();
                }if (res.data.user_found) {
                    setEmail('');
                    setPassword('');
                    dispatch(setUser({
                        name: res.data.name,
                        email: res.data.email,
                    }))
                    history.push("/");
                }if (!res.data.user_found) {
                    setError('User Not Found.')
                }
            })
            .catch(err => {
                console.log('Login error', err.response)
            });
    }
    return (<LoginContainer>
        <form>
            <h1>Login</h1>
            <p>{error}</p>
            <input onChange={(e) => setEmail(e.target.value)} placeholder='Email' value={email} />
            <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Password' value={password} />
            <Button onClick={signIn}>Sign In</Button>
        </form>
    </LoginContainer>)
}
const LoginContainer = styled.div`
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
export default Login
