import React, {useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getHolds} from '../../ducks/holdReducer';
import axios from 'axios';
import Hold from '../Hold/Hold';

function Account() {
    const {user} = useSelector((state) => state.authReducer)
    const {holds} = useSelector((state) => state.holdReducer)
    const {id, img} = user
    const dispatch = useDispatch()
    useEffect(() => {
        if (id) {
            axios.get(`/api/holds/${id}`).then(res => {
                console.log(res.data)
                dispatch(getHolds(res.data))
                
            }).catch(err => console.log(err))
        }
        
    }, [dispatch, id])

    const deleteHold = (holdId) => {
        axios.delete(`/api/holds/${holdId}/${id}`).then(res => {
            dispatch(getHolds(res.data))
        }).catch(err => console.log(err))
    }

    return (
        <div className="act-wrapper">
        <div className="account">
            <header>My Account</header>
            <div className="big-boy">
    <Link to="/settings"><img className="make-changes" alt="click for settings"src={(img === null) ? `https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png` : `${img}`}/></Link>
                <div className="hold-container">
                    <h1>CURRENT HOLDS</h1>
                    {holds.map(hold => <Hold key={hold.id} hold={hold} delete={deleteHold}/>)}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Account;