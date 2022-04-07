const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from complain where uid=?'
const sqlStr='insert into complain set ?'
const sqlUp = 'update complain set title=?,content=? where cid = ?'
const sqlCon='update complain set flag=? where cid = ?'
const sqlDel='delete from complain where cid= ?'

router.post('/test', (req, res) => {
    //console.log(Number(req.body.uid))
    db.query(sqlSel, Number(req.body.uid), (err, results) => {
        //console.log(req.body)
        console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            switch (results[i].flag) {
                case 0:
                    results[i].flag = '未受理'
                    break;
                case 1:
                    results[i].flag = '受理中'
                    break;  
                case 2:
                    results[i].flag = '待确认'
                    break;
                case 3:
                    results[i].flag = '已完成'
                    break;
                default:
                    results[i].flag='aa'
            }
            results[i].handleid = '受理：' + Math.trunc(results[i].handleid % 1000) + ' 确认：' + Math.trunc(results[i].handleid / 1000)
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