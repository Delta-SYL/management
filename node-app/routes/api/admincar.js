const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from carpark'
const sqlDel='update carpark set size=0 where cpid=?'

router.post('/test', (req, res) => {
    db.query(sqlSel, (err, result) => {
        for (var i = result.length - 1; i >= 0; i--){
            //console.log(a)
            switch (result[i].size) {
                case 1:
                    result[i].size = '购买'
                    break;
                case 2:
                    result[i].size = '租借'
                    break;  
                default:
                    result[i].size='无'
            }
            if (result[i].uid == 0) {
                result[i].uid=''
            }
        }
        res.json(result);
    })
}
)

router.post('/delete', (req, res) => {
    //console.log(req.body)
    db.query(sqlDel, req.body.addid, (err, results) => {
        res.json(results)
    })
})
const sqlUp='update carpark set uid =? ,size=? where cpid = ?'

router.post('/edit', (req, res) => {
    //console.log(req.body)
    switch (req.body.size) {
        case '购买':
            req.body.size = 1
            break;
        case '租借':
            req.body.size = 2
            break;  
        default:
            req.body.size= 0
    }
    //console.log(req.body)
    db.query(sqlUp, [req.body.uid,req.body.size,req.body.cpid], (err, results) => {
        res.json(results)
        //console.log(results)
    })
})


module.exports = router