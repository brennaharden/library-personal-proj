import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/authReducer';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Nav() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const history = useHistory()

    useEffect(() => {
        axios.get('/auth/user').then(res => {
            console.log(res.data)
            dispatch(getUser(res.data))
        }).catch(err => {
            if (err.response.status !== 401) {
                console.log(err)
            }
        })
    }, [dispatch])

    const handleLogout = () => {
        axios.post('/auth/logout').then(() => {
            dispatch(logoutUser())
            history.push('/')
            
        }).catch(err => console.log(err))
    }
    
    return (
        <div className='nav'>
            {console.log(user)}
            <Link to="/"><div className="logo-box">
                <div className="letters">
                    <div className='d'></div>
                    <div className='p'></div>
                </div>
            </div></Link>
            <div className='greeting'>
                <h1>Denton Public Library</h1>
                    {user.firstName ? (
                        <div className='logged-in'>
                            <h3>Welcome back, {user.firstName}!</h3>
                            <button onClick={handleLogout}>Log Out</button>
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