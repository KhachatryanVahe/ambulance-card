const express = require('express');
const users = require('../db.json');

const router = express.Router();

router.get('', (req, res) => {
    return res.status(200).send(users);
});

module.exports = router;