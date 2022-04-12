//longin & register

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const gravatar = require("gravatar");
const db = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");
router.get("/test", (req, res) => {
    res.json({msg:"login works"})
})
//const sqlStr = 'insert into user (uid,userName,phone,email,keyword,idNum,flag) values(?,?,?,?,?,?,?)'
const sqlStr = 'insert into user set ?'
const sqlHou = 'insert into house set ?'
const sqlSel = 'select * from user where phone=?'
const sqlUp = 'update student set? where STID=?'
const sqlDel = 'delete from student where STID=?'
const sqlSelA = 'select * from admin where adminPhone=?'
const sqlAllUser = 'select * from user where uid=?'
const sqlAllAdd = 'select * from house where uid=?'
const sqlAllCar = 'select * from carpark where uid=?'


router.post("/register", (req, res) => {
        db.query(sqlSel, req.body.email, (err, results) => {
            if (results != 0) { 
                return res.status(400).json("邮箱已被注册" )
            } else {
                console.log(req.body)
                const user = {uid:null, userName: req.body.name, phone: req.body.phone*1, email: req.body.email, keyword: req.body.password, idNum: req.body.idNum, flag: 2 }
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.keyword = hash;
                        console.log(user)
                        db.query(sqlStr, user, (err, results) => {
                            if (err) return console.log(err.message)
                            if (results.affectedRows === 1) {
                                console.log('成功')
                                //console.log(results)
                                res.json(user) 
                            }
                        })
                    });
                });
            }
            
        })

})

router.post("/login", (req, res) => {
    const password = req.body.password;
    const phone = req.body.phone;
    if (req.body.type == "user") {
        db.query(sqlSel, phone, (err, results) => {
            if (results == 0) {
                return res.status(404).json("用户不存在")
            } else if (results[0].flag == 2) {
                return res.status(404).json("等待管理员审核")
            } else if (results[0].flag == 0) {
                return res.status(404).json("已注销")
            }
            bcrypt.compare(password, results[0].keyword, (err, result) => {
                //console.log(password)
                //console.log(JSON.parse(JSON.stringify(results)))
                //console.log(results[0].password)
                const rule = { uid: results[0].uid, name: results[0].userName, phone: results[0].phone ,type:results[0].type}
                //console.log(rule)
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    //console.log(token)
                    //token=token+'1'
                    //var a = token.charAt(token.length - 1)
                    //console.log(a)
                    if (err) throw err
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
                //if (result) res.json({ msg: "success" })
                // else return res.status(400).json({password:"密码错误"})

            });
        })
    } else {
        db.query(sqlSelA, phone, (err, results) => {
            if (password == results[0].keyword) {
                const rule = { adId: results[0].adId, adminName: results[0].adminName, adminPhone: results[0].adminPhone ,type:results[0].type}
                console.log(rule)
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            }
        })
    }
})

router.get("/current", passport.authenticate("jwt",{session:false}),(req, res) => {
    //res.json(req.user.name)
    res.json({
        name: req.user.name,
        email: req.user.email,
        
    })
})

router.post("/allinfo", (req, res) => {
    
    db.query(sqlAllUser, req.body.uid, (err, results) => {
        db.query(sqlAllAdd, req.body.uid, (err, result) => {
            //console.log(result[0].address)
            results[0].address=parseInt(result[0].address/1000000)+' 栋 '+parseInt(result[0].address/1000%1000)+' 号楼 '+parseInt(result[0].address%1000)+' 室'
            //console.log(a)
            results[0].area=result[0].area+' m²'
            //console.log(results[0])
            
            db.query(sqlAllCar, req.body.uid, (err, resultc) => {
               // console.log(res[0])
                if (resultc[0].size == 1) {
                    results[0].carpark='购买'
                } else if(rresultces[0].size == 2){
                    results[0].carpark='租赁'
                } else {
                    results[0].carpark='无'
                }
                res.json(results[0])
            })
        })
    })
})

module.exports = router;