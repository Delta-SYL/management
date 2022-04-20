const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const db = require("../../models/User");
const sqlUp = 'update pay set payment = ?,content=? where pid = ?'
const sqlDel='delete from pay where pid= ?'
const adminPay = require('../../models/AdminPay')

router.post('/selw', (req, res) => {
    async function a() {
        var results = await adminPay.selectw()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
})
router.post('/selc', (req, res) => {
    async function a() {
        var results = await adminPay.selectc()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
})

router.post('/add', (req, res) => {
    async function user() {
        var resultu = await adminPay.getUser()
        var content=''
        var money=0
        for (var i = resultu.length - 1; i >= 0; i--) { 
            content = ''
            money = 0
            var resultr = await repair(resultu[i].uid)
            content = content + '报修费用：\n'
            for (var n = resultr.length - 1; n >= 0; n--) {
                money += resultr[0].money
                content = content + resultr[0].content +'  '+ resultr[0].money+'元\n'
            }
            content = content + '\n---------------------\n' + '其他事务费用：\n'
            var resulto = await other(resultu[i].uid)
            for (var n = resulto.length - 1; n >= 0; n--) {
                money += resulto[0].money
                content = content + resulto[0].content +'  '+ resulto[0].money+'元\n'
            }
            content = content + '\n---------------------\n' + '物业费： '
            var resulth = await house(resultu[i].uid)
            money += resulth[0].area * 0.1
            content = content + resulth[0].area * 0.1 + '元\n'
            content = content + '\n---------------------\n' + '车位费： '
            var resultc = await carpark(resultu[i].uid)
            if (resultc[0].flag == 0 || resultc[0].flag == 1) {
                money += 0
                content = content + '0元\n'
            } else {
                money += 40
                content = content + '40元\n'
            }
            var resultp = await payment(resultu[i].uid, money, content)
        }
        res.json(resultu);
    }

    async function repair(uid) {
        var resultr = await adminPay.getRepair(uid)
        return resultr
    }
    async function other(uid) {
        var resulto = await adminPay.getOther(uid)
        return resulto
    }
    async function house(uid) {
        var resulth = await adminPay.getHouse(uid)
        return resulth
    }
    async function carpark(uid) {
        var resultc = await adminPay.getCar(uid)
        return resultc
    }
    async function payment(uid, money, content) {
        var resultp = await adminPay.setPay(uid, money, content)
        return resultp
    }
    user()
})


router.post('/edit', (req, res) => {
    db.query(sqlUp,[req.body.payment,req.body.content,req.body.pid],(err, results) => {
        res.json(results)
    })
})


router.post('/delete', (req, res) => {
    db.query(sqlDel, req.body.pid, (err, results) => {
        res.json(results)
    })
})

module.exports = router