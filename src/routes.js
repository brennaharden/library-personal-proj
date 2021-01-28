import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Account from './components/Account/Account';
import Auth from './components/Auth/Auth';
import Catalog from './components/Catalog/Catalog';
import Dash from './components/Dash/Dash';
import RegForm from './components/RegForm/RegForm';
import Settings from './components/Settings/Settings';
import Results from './components/Results/Results';

export default <Switch>
        <Route exact path="/" component={Dash}/>
        <Route path="/login" component={Auth}/>
        <Route path="/register" component={RegForm}/>
        <Route path="/catalog" component={Catalog}/>
        <Route path="/account" component={Account}/>
        <Route path="/settings" component={Settings}/>
        <Route path="/results" component={Results}/>
    </Switch>
;