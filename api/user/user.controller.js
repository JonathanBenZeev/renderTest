const express = require('express');
const router = express.Router()
const userService = require("./user.service.js");

module.exports = router
router.post('/api/user/login', (req, res) => {
    const credentials = req.body;
    userService.checkLogin(credentials)
        .then(user => {
            if (user) {
                req.session.loggedinUser = user;
                req.session.loggedinAt = Date.now();
                res.json(user)
            } else {
                res.status(401).send({ msg: 'Wrong username/password' })
            }
        })
})

router.post('/api/user/signin', (req, res) => {
    const userDetails = req.body;
    userService._save(userDetails)
        .then(user => {
            req.session.loggedinUser = user;
            req.session.loggedinAt = Date.now();
            res.json(user)
        })
})


router.post('/api/user/logout', (req, res) => {
    res.end();
})


