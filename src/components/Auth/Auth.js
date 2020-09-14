import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {loginUser} from '../../ducks/authReducer';
import axios from 'axios';

function Auth() {
    
    const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pin, setPin] = useState('')
    const [cardNum, setCardNum] = useState('')


    const handleLogin = () => {
        axios.post('/auth/login', {email, password, cardNum, pin}).then((res) => {
        dispatch(loginUser(res.data))
        history.push('/')
        }).catch(err => {
            console.log(err)
            alert('Could not log in.')
        })
    }
    
    return (
        <div className='login-wrapper'>
        <div className='login'>
            <div className='content-container'>
            <h1>Welcome!</h1>
            <h2>Please sign in with your email and password:</h2>
            <input
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                placeholder='Password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <h2>-OR-</h2>
            <h2>Sign in with your card number and pin:</h2>
            <input
                placeholder='Card Number'
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}/>
            <input
                placeholder='4 Digit Pin'
                maxLength='4'
                value={pin}
                type="password"
                onChange={(e) => setPin(e.target.value)}/>
            
            <button onClick={handleLogin}>LOGIN</button>
            <p>New to DPL?<br/>Create an account today!</p>
            <button><Link to="/register" className="link">NEW PATRON</Link></button>
            </div>
        </div>
        </div>
    )
}

export default Auth;