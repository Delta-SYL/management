const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from notice order by num desc'
const sqlStr='insert into complain set ?'
const sqlUp = 'update complain set title=?,content=? where cid = ?'
const sqlCon='update complain set flag=? where cid = ?'
const sqlDel='delete from complain where cid= ?'

router.post('/info', (req, res) => {
    //console.log(Number(req.body.uid))
    db.query(sqlSel,(err, results) => {
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })
}
)

router.post('/add', (req, res) => {
    req.body.flag = 0
    //console.log(req.body)
    const date=new Date()
    const user = { cid: null, uid: Number(req.body.uid), title: req.body.title, content: req.body.content, flag: 0 ,date:date.toLocaleDateString().replace('/','-').replace('/','-'),handleid:null}
    //console.log(date.toLocaleDateString().replace('/','-').replace('/','-'))
    //console.log(user)
    db.query(sqlStr, user,(err, results) => {
        res.json(results)
    })
})

router.post('/edit', (req, res) => {
    db.query(sqlUp,[req.body.title,req.body.content,req.body.cid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})

router.post('/confirm', (req, res) => {
    //console.log(req.body.cid)
    db.query(sqlCon,[3,req.body.cid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})

router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.cid, (err, results) => {
        res.json(results)
    })
})

module.exports = router