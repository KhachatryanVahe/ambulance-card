const express = require('express');
const db = require('../db.json');

const router = express.Router();

router.get('', (req, res) => {
    return res.status(200).send(db.users);
});

module.exports = router;