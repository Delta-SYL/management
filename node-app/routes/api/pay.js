const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const pay=require('../../models/Pay')

router.post('/test', (req, res) => { 
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
}
)


router.post('/confirm', (req, res) => {
    async function confirm() {
        res.json(pay.confirm(req.body.pid))

    }
    confirm()
})



module.exports = router