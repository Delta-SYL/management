const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSelw = 'select * from other where flag = 0'
const sqlSeli = 'select * from other where flag = 1 or flag =2'
const sqlSelc = 'select * from other where flag = 3'
const sqlStr='insert into other set ?'
const sqlUp = 'update other set flag=? ,handleid=? where oid = ?'
const sqlUpp='update other set flag=?,handleid=?,money=? where oid = ?'

router.post('/selw', (req, res) => {
    //console.log(req.body)
    db.query(sqlSelw, (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })
})

router.post('/seli', (req, res) => {
    //console.log(req.body)
    db.query(sqlSeli, (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })
})
router.post('/selc', (req, res) => {
    //console.log(req.body)
    db.query(sqlSelc, (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })
})

router.post('/add', (req, res) => {
    req.body.flag = 0
    //console.log(req.body)
    const date=new Date()
    const user = { oid: null, uid: Number(req.body.uid), title: req.body.title, content: req.body.content, flag: 0 ,date:date.toLocaleDateString().replace('/','-').replace('/','-'),handleid:null}
    //console.log(date.toLocaleDateString().replace('/','-').replace('/','-'))
    //console.log(user)
    db.query(sqlStr, user,(err, results) => {
        res.json(results)
    })
})

router.post('/wait', (req, res) => {
    //console.log(req.body.adId)
    db.query(sqlUp,[1,req.body.adId,req.body.id],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})
const sqlAdId='select * from other where oid=?'
router.post('/processing', (req, res) => {
    db.query(sqlAdId, req.body.id, (err, result) => {
        var handleid = result[0].handleid + req.body.adId * 1000
        //console.log(req.body.oid)
        //console.log(handleid)
        db.query(sqlUpp,[2,handleid,req.body.money,req.body.id],(err, results) => {
            res.json(results)
            //console.log(err)
        })
    })
})

router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.id, (err, results) => {
        res.json(results)
    })
})

module.exports = router