const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSelw = 'select * from workrepair where flag = 0'
const sqlSeli = 'select * from workrepair where flag = 1 or flag =2'
const sqlSelc = 'select * from workrepair where flag = 3'
const sqlStr='insert into workrepair set ?'
const sqlUp = 'update workrepair set flag=? ,handleid=? where wid = ?'
const sqlUpp='update workrepair set flag=?,handleid=?,money=? where wid = ?'
const sqlDel='delete from workrepair where wid= ?'

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
    const user = { wid: null, uid: Number(req.body.uid), title: req.body.title, content: req.body.content, flag: 0 ,date:date.toLocaleDateString().replace('/','-').replace('/','-'),handleid:null}
    //console.log(date.toLocaleDateString().replace('/','-').replace('/','-'))
    //console.log(user)
    db.query(sqlStr, user,(err, results) => {
        res.json(results)
    })
})

router.post('/wait', (req, res) => {
    //console.log(req.body.adId)
    db.query(sqlUp,[1,req.body.adId,req.body.wid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})
const sqlAdId='select * from workrepair where wid=?'
router.post('/processing', (req, res) => {
    db.query(sqlAdId, req.body.wid, (err, result) => {
        var handleid = result[0].handleid + req.body.adId * 1000
        //console.log(req.body.wid)
        //console.log(handleid)
        db.query(sqlUpp,[2,handleid,req.body.money,req.body.wid],(err, results) => {
            res.json(results)
            //console.log(err)
        })
    })
})

router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.wid, (err, results) => {
        res.json(results)
    })
})

module.exports = router