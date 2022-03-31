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
const sqlStr = 'insert into test set ?'
const sqlSel = 'select * from test where email=?'
const sqlUp = 'update student set? where STID=?'
const sqlDel = 'delete from student where STID=?'

router.post("/register", (req, res) => {
        db.query(sqlSel, req.body.email, (err, results) => {
            if (results != 0) { 
                return res.status(400).json("邮箱已被注册" )
            } else {
                console.log(req.body)
                const user = { name: req.body.name, email: req.body.email, password: req.body.password }
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) throw err;
                        user.password = hash;
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
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    db.query(sqlSel, req.body.email, (err, results) => {
        if (results == 0) {
            return res.status(404).json("用户不存在")
        } 
        bcrypt.compare(password, results[0].password, (err, result) => {
            //console.log(password)
            //console.log(JSON.parse(JSON.stringify(results)))
            //console.log(results[0].password)
            const rule={name:name,email:email,password:password}
            jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                if (err) throw err
                res.json({
                    success: true,
                    token:"Bearer "+token
                })
            })
            //if (result) res.json({ msg: "success" })
           // else return res.status(400).json({password:"密码错误"})

        });
    })

})

router.get("/current", passport.authenticate("jwt",{session:false}),(req, res) => {
    //res.json(req.user.name)
    res.json({
        name: req.user.name,
        email: req.user.email,
        
    })
})

module.exports = router;