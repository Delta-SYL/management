const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from notice order by num desc'
const sqlStr='insert into notice set ?'
const sqlUp = 'update notice set title=?,content=? where num = ?'

router.post('/test', (req, res) => {
    //console.log(Number(req.body.uid))
    db.query(sqlSel, (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })
}
)

router.post('/add', (req, res) => {
    //console.log(req.body)
    const date=new Date()
    const user = { num: null, title: req.body.title, content: req.body.content, adId: Number(req.body.adId), date: date.toLocaleDateString().replace('/', '-').replace('/', '-') }
    db.query(sqlStr, user,(err, results) => {
        res.json(results)
    })
})

router.post('/edit', (req, res) => {
    db.query(sqlUp,[req.body.title,req.body.content,req.body.num],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})

module.exports = router