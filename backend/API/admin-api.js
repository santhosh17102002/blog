const exp = require('express')
const adminApp = exp.Router()

adminApp.get('/test-admin',(req,res)=>{
    res.send("from admin api")
})


//hello

module.exports = adminApp