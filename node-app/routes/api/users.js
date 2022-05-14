//longin & register

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
//const gravatar = require("gravatar");
const db = require("../../models/User");
const keys = require("../../config/keys");
const passport = require("passport");
var fs=require('fs')
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
const sqlAddH='insert into house set ?'
const sqlAddC='insert into carpark set ?'
router.post("/register", (req, res) => {
        db.query(sqlSel, req.body.phone, (err, results) => {
            if (results != 0) { 
                return res.status(400).json("手机号已被注册" )
            } else {
                const user = {uid:null, userName: req.body.name, phone: req.body.phone*1, email: req.body.email, keyword: req.body.password, idNum: req.body.idNum, flag: 2 }
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.keyword = hash;
                        db.query(sqlStr, user, (err, results) => {
                            if (err) return console.log(err.message)
                            if (results.affectedRows === 1) {
                                console.log('成功')
                                db.query(sqlSel, req.body.phone, (err, resultp) => {
                                    var area = req.body.room % 10 * 5 % 15 + 60
                                    var address = req.body.building * 1000000 + req.body.build * 1000 + req.body.room * 1
                                    db.query(sqlAddH, {addid:null,address:address, uid:resultp[0].uid,area:area,pic:req.body.pic}, (err,resulth)=> {
                                        db.query(sqlAddC, {cpid:null, uid: resultp[0].uid, size: req.body.carpark * 1 }, (err, resultc) => {
                                            const base64 = req.body.imgstr.replace(/^data:image\/\w+;base64,/, "");
                                            console.log(req.body.pic)
                                            const path = 'C:\\Users\\Delta\\Desktop\\论文\\已传图片\\'+req.body.pic;
                                             fs.writeFile(path, base64, 'base64', function (err) {
                                                 if (err) {
                                                     console.log(err);
                                                 } else {
                                                     console.log('写入成功！', path);
                                                 }
                                             });

                                            res.json(user) 
                                        })
                                    })
                                }) 
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
                const rule = { uid: results[0].uid, name: results[0].userName, phone: results[0].phone ,type:results[0].type}
                jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    })
                })
            });
        })
    } else {
        db.query(sqlSelA, phone, (err, results) => {
            if (results == 0) {
                return res.status(404).json("账号或密码错误")
            }
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
    res.json({
        name: req.user.name,
        email: req.user.email,
        
    })
})

router.post("/allinfo", (req, res) => {
    db.query(sqlAllUser, req.body.uid, (err, results) => {
        db.query(sqlAllAdd, req.body.uid, (err, result) => {
            results[0].address=parseInt(result[0].address/1000000)+' 幢 '+parseInt(result[0].address/1000%1000)+' 栋 '+parseInt(result[0].address%1000)+' 室'
            results[0].area=result[0].area+' m²'
            results[0].pic=result[0].pic
            db.query(sqlAllCar, req.body.uid, (err, resultc) => {
                if (resultc[0].size == 1) {
                    results[0].carpark='购买'
                } else if(resultc[0].size == 2){
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