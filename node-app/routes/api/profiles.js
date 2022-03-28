const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from test2 '
const sqlStr = 'insert into test2 set ?'
const sqlUp = 'update test2 set ? where money = ?'
const sqlDel = 'delete from test2 where money= ?'

router.get('/test', (req, res) => {
    db.query(sqlSel, (err, results) => {
        res.json(results);
    })
}
)

router.post('/add', (req, res) => {
    db.query(sqlStr, req.body,(err, results) => {
        res.json(results)
    })
})

router.post('/edit', (req, res) => {
    db.query(sqlUp,[ req.body,req.body.money],(err, results) => {
        res.json(results)
        //console.log(err)
    })
    //console.log(req.body.money)
})
router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.money, (err, results) => {
        res.json(results)
    })
})

module.exports = router