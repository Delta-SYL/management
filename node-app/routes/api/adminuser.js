const { json } = require('body-parser');
const express = require('express');
const { EUCKR_BIN } = require('mysql/lib/protocol/constants/charsets');
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from user'
const sqlStr='insert into other set ?'
const sqlUp = 'update user set flag=1 where uid = ?'
const sqlCon='update other set flag=? where oid = ?'
const sqlDel='update user set flag=0 where uid=?'

router.post('/test', (req, res) => {
    db.query(sqlSel, (err, results) => {
        for (var i = results.length - 1; i >= 0; i--){
            switch (results[i].flag) {
                case 0:
                    results[i].flag = '已注销'
                    break;
                case 1:
                    results[i].flag = '登记'
                    break;  
                default:
                    results[i].flag='待审核'
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
    var a = {liveName: '',address:'',area:'',pic:'',size:'',cpid:''}
    db.query(sqlHouseHold, req.body.uid, (err, results) => {
        for (var i = results.length - 1; i >= 0; i--){
            results[i].liveName = '姓名：' + results[i].liveName + ' 身份证号：' + results[i].idNum + ' 与户主关系：' + results[i].relationship
            a.liveName=a.liveName+results[i].liveName+'\n'
        }
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
            a.size = result[0].size
            a.cpid = result[0].cpid
            results.push(result[0])
            db.query(sqlHouse, req.body.uid, (err, resul) => {
                a.address = parseInt(resul[0].address / 1000000) + ' 幢 ' + parseInt(resul[0].address / 1000 % 1000) + ' 栋 ' + parseInt(resul[0].address % 1000) + ' 室'
                a.area = resul[0].area + ' m²'
                a.pic = resul[0].pic
                res.json(a)
            })
        })
    })
})

router.post('/add', (req, res) => {
    db.query(sqlUp,[req.body.uid],(err, results) => {
        res.json(results)
    })
})

router.post('/confirm', (req, res) => {
    db.query(sqlCon,[3,req.body.oid],(err, results) => {
        res.json(results)
    })
})

router.post('/delete', (req, res) => {
    db.query(sqlDel, req.body.uid, (err, results) => {
        res.json(results)
    })
})

module.exports = router