const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from pay where uid=?'
const sqlStr='insert into other set ?'
const sqlUp = 'update other set title=?,content=? where oid = ?'
const sqlCon='update pay set flag=? where pid = ?'
const sqlDel='delete from other where oid= ?'
const pay=require('../../models/Pay')
const async =require('async')

router.post('/test', (req, res) => {
    /*async function select(uid) {
        return new Promise((success, error)=> {
            db.query(sqlSel, uid, (err, result) => {
               success(result)
            })
            //return 5
        })
        
    }*/
    async function a() {
        var results = await pay.select(Number(req.body.uid))
        for (var i = results.length - 1; i >= 0; i--){
            switch (results[i].flag) {
                case 0:
                    results[i].flag = '未缴费'
                    break;
                case 1:
                    results[i].flag = '已缴费'
                    break;  
                default:
                    results[i].flag='aa'
            }
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
    /*async function getData(){
        return '这是一个数据';
     }
     async function test(){
        var d=await getData();
        console.log(d);
     }
     test();*/
    /*db.query(sqlSel, Number(req.body.uid), (err, results) => {
        //console.log(req.body)
        //console.log(results[0].flag)
        for (var i = results.length - 1; i >= 0; i--){
            switch (results[i].flag) {
                case 0:
                    results[i].flag = '未缴费'
                    break;
                case 1:
                    results[i].flag = '已缴费'
                    break;  
                default:
                    results[i].flag='aa'
            }
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    })*/
}
)


router.post('/confirm', (req, res) => {
    //console.log(req.body.oid)
    db.query(sqlCon,[1,req.body.pid],(err, results) => {
        res.json(results)
        //console.log(err)
    })
})



module.exports = router