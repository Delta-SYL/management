const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const household=require('../../models/HouseHold')
router.post('/test', (req, res) => {
    async function a() {
        res.json(await household.select(Number(req.body.uid)))
    }
    a()
})

router.post('/add', (req, res) => {
    const date=new Date()
    const user = {uid:req.body.uid,liveName:req.body.liveName,idNum:req.body.idNum,relationship:req.body.relationship}
    //console.log(date.toLocaleDateString().replace('/','-').replace('/','-'))
    //console.log(user)
    async function a() {
        res.json(await household.add(user))
    }
    a()
})

router.post('/delete', (req, res) => {
    async function a() {
        res.json(await household.deleteinfo(req))
    }
    a()
})

module.exports = router