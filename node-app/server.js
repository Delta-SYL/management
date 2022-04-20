const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users=require("./routes/api/users")
const repair=require("./routes/api/repair")
const complain = require("./routes/api/complain")
const other = require("./routes/api/other")
const household=require("./routes/api/household")
const pay = require("./routes/api/pay")
const adminrepair=require("./routes/api/adminrepair")
const adminother = require("./routes/api/adminother")
const admincomplain = require("./routes/api/admincomplain")
const notice = require("./routes/api/notice")
const adminuser =require("./routes/api/adminuser")
const adminhouse = require("./routes/api/adminhouse")
const admincar = require("./routes/api/admincar")
const adminnotice = require("./routes/api/adminnotice")
const adminpay=require("./routes/api/adminpay")

app.use(bodyParser.json({limit: '50mb'}));//使能 post 50mb以下的数据
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(passport.initialize())
require("./config/passport")(passport)
app.use("/api/users", users);
app.use("/api/repair",repair)
app.use("/api/complain", complain)
app.use("/api/other", other)
app.use("/api/household",household)
app.use("/api/pay", pay)
app.use("/api/adminrepair",adminrepair)
app.use("/api/adminother", adminother)
app.use("/api/admincomplain", admincomplain)
app.use("/api/notice", notice)
app.use("/api/adminuser", adminuser)
app.use("/api/adminhouse", adminhouse)
app.use("/api/admincar", admincar)
app.use("/api/adminnotice", adminnotice)
app.use("/api/adminpay", adminpay)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:5000`);
})

