const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const other=require('../../models/Other')

router.post('/test', (req, res) => {
    async function a() {
        var results = await other.select(Number(req.body.uid))
        for (var i = results.length - 1; i >= 0; i--) {
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
                    results[i].flag = 'aa'
            }
            results[i].handleid = '受理：' + Math.trunc(results[i].handleid % 1000) + ' 确认：' + Math.trunc(results[i].handleid / 1000)
            results[i].date = results[i].date.toLocaleDateString().replace('/', '-').replace('/', '-')
        }
        res.json(results);
    }
    a()
}
)

router.post('/add', (req, res) => {
    req.body.flag = 0
    const date=new Date()
    const user = { oid: null, uid: Number(req.body.uid), title: req.body.title, content: req.body.content, flag: 0 ,date:date.toLocaleDateString().replace('/','-').replace('/','-'),handleid:null}
    async function a() {
        res.json(await other.add(user))
    }
    a()
})

router.post('/edit', (req, res) => {
    async function a() {
        res.json(await other.edit(req))
    }
    a()
})

router.post('/confirm', (req, res) => {
    async function a() {
        res.json(await other.confirm(req))
    }
    a()
})

router.post('/delete', (req, res) => {
    async function a() {
        res.json(await other.deleteinfo(req))
    }
    a()
})

module.exports = router