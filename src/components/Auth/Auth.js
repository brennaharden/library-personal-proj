import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginUser} from '../../ducks/authReducer';
import axios from 'axios';

function Auth() {
    
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pin, setPin] = useState('')
    const [cardNum, setCardNum] = useState(0)


    const handleLogin = () => {
        axios.post('/auth/login', {email, password, cardNum, pin}).then((res) => {
        dispatch(loginUser(res.data))
        }).catch(err => {
            console.log(err)
            alert('Could not log in.')
        })
    }
    
    return (
        <div>
            <h1>Auth</h1>
            <input
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <h1>OR</h1>
            <input
                placeholder='Card Number'
                value={cardNum}
                onChange={(e) => setCardNum(e.target.value)}/>
            <input
                placeholder='4 Digit Pin'
                value={pin}
                onChange={(e) => setPin(e.target.value)}/>
            
            <button onClick={handleLogin}>SUBMIT</button>
        </div>
    )
}

export default Auth;