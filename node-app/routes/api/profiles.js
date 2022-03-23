const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from test2 '

router.get('/test', (req, res) => {
    db.query(sqlSel, (err, results) => {
        res.json(results);
    })
}
)
module.exports = router