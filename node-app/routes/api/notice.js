const { json } = require('body-parser');
const express = require('express')
const router = express.Router();
const notice =require('../../models/Notice')

router.post('/info', (req, res) => {
    async function a() {
        var results = await notice.select()
        for (var i = results.length - 1; i >= 0; i--){
            results[i].date=results[i].date.toLocaleDateString().replace('/','-').replace('/','-')
        }
        res.json(results);
    }
    a()
} 
)


module.exports = router