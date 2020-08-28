import React from 'react';
import {Link} from 'react-router-dom';

function Account() {
    return (
        <div>
            <h1>Account</h1>
            <div className="make-changes"><Link to="/settings">Settings</Link></div>
        </div>
    )
}

export default Account;