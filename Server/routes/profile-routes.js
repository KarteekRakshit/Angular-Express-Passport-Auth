const router = require('express').Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const authCheck = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile', {
        user: req.user
    });
});
router.get('/events', (req, res) => {
    let events = [{
            "_id": "1",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Potato",
            "description": "Its a vegetable",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})
router.get('/special', (req, res) => {

    let events = [{
            "_id": "1",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "2",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "3",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "4",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "5",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        },
        {
            "_id": "6",
            "name": "Auto Expo",
            "description": "lorem ipsum",
            "date": "2012-04-23T18:25:43.511Z"
        }
    ]
    res.json(events)
})
function verifyToken(req,res,next) {
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized requst');
    }
    let token = req.headers.authorization.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send('Unauthorized requst');
    }
    let payload = jwt.verify(token,'secretKey');
    if(!payload){
        return res.status(401).send('Unauthorized requst');
    }
    req.userId = payload.subject;
    next();
}
module.exports = router;