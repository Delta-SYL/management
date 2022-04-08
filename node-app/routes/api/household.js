const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from household where uid=?'
const sqlStr='insert into household set ?'
const sqlCon='update other set flag=? where oid = ?'
const sqlDel='delete from household where idNum= ?'

router.post('/test', (req, res) => {
    //console.log(Number(req.body.uid))
    db.query(sqlSel, Number(req.body.uid), (err, results) => {
        res.json(results);
    })
}
)

router.post('/add', (req, res) => {
    //req.body.flag = 0
    //console.log(req.body)
    const date=new Date()
    const user = {uid:req.body.uid,liveName:req.body.liveName,idNum:req.body.idNum,relationship:req.body.relationship}
    //console.log(date.toLocaleDateString().replace('/','-').replace('/','-'))
    //console.log(user)

    db.query(sqlStr, user,(err, results) => {
        res.json(results)
    })
})


router.post('/delete', (req, res) => {
    //console.log(req.body)
    //console.log(req.body.idNum)
    db.query(sqlDel, req.body.idNum, (err, results) => {
        res.json(results)
    })
})

module.exports = router