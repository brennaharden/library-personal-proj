const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res) => {
        const db = req.app.get('db');
        const {firstName, lastName, email, password, pin, resident} = req.body
        const alreadyExists = await db.check_patron(email)
        if(alreadyExists.length){
            return res.status(409).send('This email is already associated with an account.')
        }
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(password, salt);
        const pinHash = bcrypt.hashSync(pin, salt)
        const [newPatron] = await db.create_patron([firstName, lastName, email, hash, pinHash, resident])
        req.session.user = {
            id: newPatron.card_num,
            firstName: newPatron.first_name,
            lastName: newPatron.last_name,
            email: newPatron.email,
            img: newPatron.img
        }
        console.log(req.session.user)
        res.status(200).send(req.session.user)
    },
    login: async (req, res) => {
        const db = req.app.get('db');
        const {email, password, cardNum, pin} = req.body
        let patron
        let authenticated
        if(email) {
            const [foundPatron] = await db.check_patron(email);
            patron = foundPatron
        } else if (cardNum) {
            const [foundPatron] = await db.check_card(cardNum);
            patron = foundPatron
        }
        
        if (!patron) {
            return res.status(401).send('Login information incorrect.')
        } else if (password) {
            authenticated = bcrypt.compareSync(password, patron.password);
        
        } else if (pin) {
            authenticated = bcrypt.compareSync(pin, patron.pin);
            
        } else {

            res.status(403).send('Invalid credentials')
        }

        if (authenticated) {
            req.session.user = {
                id: patron.card_num,
                firstName: patron.first_name,
                lastName: patron.last_name,
                email: patron.email,
                img: patron.img
                    }
                console.log(req.session.user)
                res.status(200).send(req.session.user)
            } else {
                 res.status(401).send('Invalid credentials')
            }
    },
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200)
        console.log('Logout')
    },
    getUser: (req,res) => {
        if(req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(401)
        }
    }
}
