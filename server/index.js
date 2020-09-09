require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const app = express();
const {CONNECTION_STRING, SESSION_SECRET, SERVER_PORT} = process.env
const authCtrl = require('./authController');
const holdCtrl = require('./holdController');
const setCtrl = require('./setController');
const mailCtrl = require('./mailController');


app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    secret: SESSION_SECRET
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log('db babies')
}).catch(err => console.log(err))

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)
app.post('/auth/logout', authCtrl.logout)
app.get('/auth/user', authCtrl.getUser)
app.post('/api/hold', holdCtrl.placeHold)
app.get('/api/holds/:id', holdCtrl.getHolds)
app.delete('/api/holds/:holdId/:id', holdCtrl.deleteHold)
app.get('/api/signs3', setCtrl.config)
app.put('/api/user', setCtrl.saveUrl)
app.post('/api/email', mailCtrl.email)

app.listen(SERVER_PORT, () => console.log(`talking bout me & you in ${SERVER_PORT}`))