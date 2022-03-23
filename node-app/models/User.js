const mysql = require("mysql")

/*const Schema = mysql.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default:Date.now
    },
})


module.exports = User = mysql.model("users",UserSchema);*/

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '5555',
    database:'12345'
})
module.exports = db;