import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/authReducer';
import axios from 'axios';

function Nav() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])

    const handleLogout = () => {
        axios.post('/auth/logout').then(() => {
            dispatch(logoutUser())
            
        }).catch(err => console.log(err))
    }
    
    return (
        <div className='nav'>
            <h2><Link to="/">Home Logo</Link></h2>
            <div className='greeting'>
                <h1>Denton Public Library</h1>
                    {user.firstName ? (
                        <div className='logged-in'>
                            <h3>Welcome back, {user.firstName}!</h3>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    ) : null}
                    
            </div>
            <h2>Events</h2>
            <h2><Link to="/catalog">Catalog</Link></h2>
            <h2>Resources</h2>
            {user.firstName ? (
                <h2><Link to="/account">Account</Link></h2>
            ) : <h2><Link to="/login">Log In</Link></h2>}
            
        </div>
    )
}

export default Nav;