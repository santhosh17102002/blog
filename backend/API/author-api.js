const exp = require('express')
const authorApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

let authorCollection;
let articleCollection;
authorApp.use((req,res,next)=>{
    authorCollection = req.app.get('authorCollection')
    articleCollection = req.app.get('articleCollection')
    next()
})

authorApp.get('/test-author',async(req,res)=>{
    let authorList = await authorCollection.find().toArray()
    res.send({payload:authorList})
})
//create author
authorApp.post('/register',async(req,res)=>{
    let newAuthor = req.body
    let dbAuthor = await authorCollection.findOne({username:newAuthor.username})
    if(dbAuthor!= null){
        return res.send({message:"Author already existed"});
    }
    //used to hash the password min value of salt is 1 and max is 10    
    let hashedPassword = await bcryptjs.hash(newAuthor.password,6)
    //replace plain password with hashed password
    newAuthor.password = hashedPassword;
    await authorCollection.insertOne(newAuthor)
    res.send({message:"author created"})
    
})
//login author
authorApp.post('/login',async(req,res)=>{
    const credObj = req.body;
    let dbAuthor = await authorCollection.findOne({username:credObj.username})
    if(dbAuthor===null){
        res.send({message:"invalid username"})
    }else{
        let result = await bcryptjs.compare(credObj.password,dbAuthor.password)
        //if passwords not matched
        if(result === false){
            res.send({message:"Invalid password"})
        }else{
            //create token
            let signedToken = jwt.sign({username:dbAuthor.username},'abcdef',{expiresIn:30})
            //10 => 10 sec
            //"10d" => 10 days
            //"10" =>10 min
            //"10w" => 10 weeks
            //send token as response
            res.send({message:"login success",token:signedToken,author:dbAuthor})

        }
        //returns true or false
    }
})


//add article
authorApp.post('/article',async(req,res)=>{
    const newArticle = req.body;
    await articleCollection.insertOne(newArticle)
    res.send({message:"new article added"})
})
authorApp.get('/articles/:username',async(req,res)=>{
    let authorUsername = req.params.username;
    //get article of current author
    let articleList = await articleCollection.find({username:authorUsername}).toArray()
    res.send({message:"articles",payload:articleList})
})
//delete or restore article
authorApp.put('/articles/:username/:articleId',async(req,res)=>{
    let articleIdOfUrl = req.params.articleId;
    let removedArticle = await articleCollection.findOneAndUpdate(
        {articleId:articleIdOfUrl},
        {$set:{status:false}},
        {returnDocument:"after"}
    );
    res.send({message:"article removed",payload:removedArticle})
})
//read articles


module.exports = authorApp
