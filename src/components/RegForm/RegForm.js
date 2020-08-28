import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {loginUser} from '../../ducks/authReducer';
import axios from 'axios';

function RegForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [pin, setPin] = useState('')
    const [resident, setResident] = useState(true)

    const handleRegister = () => {
        axios.post('/auth/register', {firstName, lastName, email, password, pin, resident}).then((res) => {
        dispatch(loginUser(res.data))
        history.push("/account")
        }).catch(err => {
            console.log(err)
            alert('Could not complete the registration process.')
        })
    }
        
    return (
        <div className="reg">
            <h1>RegForm</h1>
            <input 
                placeholder='First Name'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}/>
            <input
                placeholder='Last Name'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}/>
            <input
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            <input
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <input
                placeholder='4 Digit Pin'
                value={pin}
                onChange={(e) => setPin(e.target.value)}/>
            <input
                placeholder='Resident? true or false'
                value={resident}
                onChange={(e) => setResident(e.target.value)}/>
            <button onClick={handleRegister}>SUBMIT</button>
        </div>
    )
}

export default RegForm;