const { json } = require('body-parser');
const express = require('express');
const { EUCKR_BIN } = require('mysql/lib/protocol/constants/charsets');
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from user where flag=0 or flag=1'
const sqlStr='insert into other set ?'
const sqlUp = 'update other set title=?,content=? where oid = ?'
const sqlCon='update other set flag=? where oid = ?'
const sqlDel='update user set flag=0 where uid=?'

router.post('/test', (req, res) => {
    //console.log(Number(req.body.uid))
    db.query(sqlSel, (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            switch (results[i].flag) {
                case 0:
                    results[i].flag = '已注销'
                    break;
                case 1:
                    results[i].flag = '登记'
                    break;  
                default:
                    results[i].flag='aa'
            }
        }
        res.json(results);
    })
}
)
const sqlHouseHold = 'select * from household where uid = ?'
const sqlCar = 'select * from carpark where uid = ?'
const sqlHouse='select * from house where uid = ?'
router.post('/check', (req, res) => {
    //console.log(req.body.uid)
    db.query(sqlHouseHold, req.body.uid, (err, results) => {
        db.query(sqlCar, req.body.uid, (err, result) => {
            switch (result[0].size) {
                case 1:
                    result[0].size = '购买'
                    break;
                case 2:
                    result[0].size = '租借'
                    break;  
                default:
                    result[0].size='没有'
            }
            results.push(result[0])
            //console.log(results)
            db.query(sqlHouse, req.body.uid, (err, resul) => {
                resul[0].address = parseInt(resul[0].address / 1000000) + ' 幢 ' + parseInt(resul[0].address / 1000 % 1000) + ' 栋 ' + parseInt(resul[0].address % 1000) + ' 室'
                results.push(resul[0])
                //console.log(results)
                res.json(results)
            })
        })
        
        
    })
})

router.post('/edit', (req, res) => {
    db.query(sqlUp,[req.body.title,req.body.content,req.body.oid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})

router.post('/confirm', (req, res) => {
    //console.log(req.body.oid)
    db.query(sqlCon,[3,req.body.oid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})

router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.uid, (err, results) => {
        res.json(results)
    })
})

module.exports = router