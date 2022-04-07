const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

const users=require("./routes/api/users")
const profiles=require("./routes/api/profiles")
const repair=require("./routes/api/repair")
const complain = require("./routes/api/complain")
const other = require("./routes/api/other")


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(passport.initialize())
require("./config/passport")(passport)

/*app.get("/", (req, res) => {
    res.send("Hello World!")
})*/
app.use("/api/users", users);
//app.use("/api/profiles", profiles);
app.use("/api/repair",repair)
app.use("/api/complain", complain)
app.use("/api/other",other)


const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port} http://localhost:5000`);
})

//module.exports = db
