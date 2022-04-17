const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSelw = 'select * from complain where flag = 0'
const sqlSeli = 'select * from complain where flag = 1 or flag =2'
const sqlSelc = 'select * from complain where flag = 3'
const sqlUp = 'update complain set flag=? ,handleid=? where cid = ?'
const sqlUpp='update complain set flag=?,handleid=? where cid = ?'
const sqlAdId='select * from complain where cid=?'

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

router.post('/wait', (req, res) => {
    //console.log(req.body.adId)
    db.query(sqlUp,[1,req.body.adId,req.body.id],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})
router.post('/processing', (req, res) => {
    db.query(sqlAdId, req.body.id, (err, result) => {
        var handleid = result[0].handleid + req.body.adId * 1000
        db.query(sqlUpp,[2,handleid,req.body.id],(err, results) => {
            res.json(results)
            //console.log(err)
        })
    })
})

module.exports = router