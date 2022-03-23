const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const mysql = require('mysql')
const db = require('../models/User')
const keys = require('../config/keys')
const sqlStr = 'insert into test set ?'
const sqlSel = 'select * from test where email=?'
const sqlUp = 'update student set? where STID=?'
const sqlDel = 'delete from student where STID=?'
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=> {
        //console.log(jwt_payload)
        db.query(sqlSel, jwt_payload.email, (err, results) => {
            if (results != 0) {
                //console.log(results[0])
                const user=results[0]
                return done(null,user)
            }
            //return done(null,false)
        })
    }));
}