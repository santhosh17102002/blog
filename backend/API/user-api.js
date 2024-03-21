const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')

let userCollection;
userApp.use((req,res,next)=>{
    userCollection = req.app.get('usersCollection')
    next()
})

userApp.get('/test-user',async(req,res)=>{
    let userList = await userCollection.find().toArray()
    res.send({payload:userList})
})

userApp.post('/register',async(req,res)=>{
    let newUser = req.body
    let dbUser = await userCollection.findOne({username:newUser.username})
    if(dbUser!= null){
        return res.send({message:"User already existed"});
    }
    //used to hash the password min value of salt is 1 and max is 10    
    let hashedPassword = await bcryptjs.hash(newUser.password,6)
    //replace plain password with hashed password
    newUser.password = hashedPassword;
    await userCollection.insertOne(newUser)
    res.send({message:"user created"})
    
})


module.exports = userApp