const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const verifyToken = require('../Middlewares/verifyToken');

let userCollection;
userApp.use((req,res,next)=>{
    userCollection = req.app.get('usersCollection')
    articleCollection = req.app.get('articleCollection')
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
userApp.post('/login',async(req,res)=>{
    const credObj = req.body;
    let dbUser = await userCollection.findOne({username:credObj.username})
    if(dbUser===null){
        res.send({message:"invalid username"})
    }else{
        let result = await bcryptjs.compare(credObj.password,dbUser.password)
        //if passwords not matched
        if(result === false){
            res.send({message:"Invalid password"})
        }else{
            //create token
            let signedToken = jwt.sign({username:dbUser.username},'abcdef',{expiresIn:"2d"})
            //10 => 10 sec
            //"10d" => 10 days
            //"10" =>10 min
            //"10w" => 10 weeks
            //send token as response
            delete dbUser.password;
            res.send({message:"login success",token:signedToken,user:dbUser})

        }
        //returns true or false
    }
})
userApp.get("/articles",verifyToken,async(req,res)=>{
    let articlesList = await articleCollection
    .find({status:true})
    .toArray();
    res.send({message:"articles",payload:articlesList});

});
//add comment by user
userApp.put('/article/:articleId/comment',verifyToken,async(req,res)=>{
    let commentObj = req.body;
    let articleIdOfUrl = req.params.articleId;
    let articleWithComment = await articleCollection.findOneAndUpdate(
        {articleId:articleIdOfUrl},
        {$addToSet:{comments:commentObj}},
        {returnDocument:"after"}
    )
    res.send({message:"comment posted",payload:articleWithComment})
})

module.exports = userApp