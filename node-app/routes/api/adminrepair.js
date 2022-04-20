const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const db = require("../../models/User");
const sqlUpp='update workrepair set flag=?,handleid=?,money=? where wid = ?'
const sqlAdId='select * from workrepair where wid=?'
const adminrepair = require('../../models/AdminRepair')

router.post('/selw', (req, res) => {
    async function a() {
        var results = await adminrepair.selectw()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
})
router.post('/seli', (req, res) => {
    async function a() {
        var results = await adminrepair.selecti()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
})
router.post('/selc', (req, res) => {
    async function a() {
        var results = await adminrepair.selectc()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
})

router.post('/wait', (req, res) => {
    async function a() {
        res.json(await adminrepair.wait(req))
    }
    a()
})
router.post('/processing', (req, res) => {
    db.query(sqlAdId, req.body.id, (err, result) => {
        var handleid = result[0].handleid + req.body.adId * 1000
        db.query(sqlUpp,[2,handleid,req.body.money,req.body.id],(err, results) => {
            res.json(results)
        })
    })
})

module.exports = router