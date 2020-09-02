module.exports = {
    placeHold: async (req, res) => {
        const db = req.app.get('db');
        const {id, book_id, title, author_fl, cover, ISBN} = req.body
        const placed = await db.place_hold([id, book_id, title, author_fl, cover, ISBN])
        if(placed) {
            res.sendStatus(200)
        } else {
            res.status(400).send('Could not complete request.')
        }
        
    },
    getHolds: async (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params
        const holds = await db.get_holds(id)
        if(holds) {
            res.status(200).send(holds)
        } else {
            res.status(400).send('Could not complete request.')
        }
    },
    deleteHold: async (req, res) => {
        const db = req.app.get('db');
        const {holdId, id} = req.params
        const holds = await db.delete_hold(holdId, id)
        if(holds) {
            res.status(200).send(holds)
        } else {
            res.status(400).send('Could not complete request.')
        }
    }
}