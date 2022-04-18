const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const passport = require("passport");
const db = require("../../models/User");
const sqlSel = 'select * from house order by address asc'
const sqlDel='delete from house where addid= ?'

router.post('/test', (req, res) => {
    db.query(sqlSel, (err, result) => {
        for (var i = result.length - 1; i >= 0; i--){
            result[i].address=parseInt(result[i].address/1000000)+' 幢 '+parseInt(result[i].address/1000%1000)+' 栋 '+parseInt(result[i].address%1000)+' 室'
            //console.log(a)
            result[i].area=result[i].area+' m²'
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

module.exports = router