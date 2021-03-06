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

    const welcomeMessage = () => {
        const message = `Welcome to Denton Public Library, ${firstName}!
        Remember to bring photo ID and proof of residence with you on your first visit to your local branch. Until then, enjoy our online resources!
        Sincerely,
        Your Librarians`
        const title = `Welcome, New Patron!`
        const image = 'https://png.pngitem.com/pimgs/s/7-77375_computer-icons-book-clip-art-stack-of-books.png'
        axios.post('/api/email', {message, title, email, image}).then(() => {
            console.log('Email Sent Successfully')
        }).catch(err => console.log(err))
    }
    
    const handleRegister = () => {
        axios.post('/auth/register', {firstName, lastName, email, password, pin, resident}).then((res) => {
        dispatch(loginUser(res.data))
        welcomeMessage()
        history.push("/account")
        }).catch(err => {
            console.log(err)
            alert('Could not complete the registration process.')
        })
    }
        
    return (
        <div className='reg-wrapper'>
        <div className="reg">
            <div className='reg-form'>
            <h1>Join Our Community</h1>
            <h2>To register as a new patron,<br/> please complete the fields below.</h2>
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
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            <input
                placeholder='4 Digit Pin'
                type='password'
                maxLength='4'
                value={pin}
                onChange={(e) => setPin(e.target.value)}/>
            <p>Are you a resident of Denton County?*</p>
            <select 
            value={resident}
            onChange={(e) => setResident(e.target.value)}>
                <option value={true}>Resident</option>
                <option value={false}>Non-Resident</option>
                </select>
            <p>*Non-residents must pay a $40 annual fee for access to library resources.</p>
            <button onClick={handleRegister}>SUBMIT</button>
            </div>
        </div>
        </div>
    )
}

export default RegForm;