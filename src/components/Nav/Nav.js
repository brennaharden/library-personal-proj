import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, logoutUser} from '../../ducks/authReducer';
import {useHistory} from 'react-router-dom';
import axios from 'axios';

function Nav() {
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.authReducer)
    const history = useHistory()
    const [open, setMenu] = useState(false)

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

    const toggleMenu = () => {
        setMenu(!open)
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
            
            <div className="container" >
                <div className={open ? "change menu-items" : "menu-items"}>
                    <h2 className={open ? "change event" : "event"}>Events</h2>
                    <h2 className={open ? "change cat" : "cat"}><Link to="/catalog" className="link">Catalog</Link></h2>
                    <h2 className={open ? "change resources" : "resources"}>Resources</h2>
                    {user.firstName ? (
                        <h2 className={open ? "change user" : "user"}><Link to="/account" className="link">Account</Link></h2>
                    ) : <h2 className={open ? "change user" : "user"}><Link to="/login" className="link">Log In</Link></h2>}
                </div>
                <div className={open ? "change hamburger" : "hamburger"} onClick={toggleMenu}>
                <div className={open ? "change bar1" : "bar1"}></div>
                <div className={open ? "change bar2" : "bar2"}></div>
                <div className={open ? "change bar3" : "bar3"}></div>
                </div>
            </div>
        </div>
    )
}

export default Nav;