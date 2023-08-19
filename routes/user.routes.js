const express=require("express")
const userRouter=express.Router()
const {UserModel}=require("../model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

userRouter.post("/register",async(req,res)=>{
  const {email,pass,location,age}=req.body
    try {
    bcrypt.hash(pass, 5, async(err, hash)=> {
     
    const user=new UserModel({email,pass:hash,location,age})     // Store hash in your password DB.
    // console.log('req:', req.body)
    await user.save()
    res.status(200).send({"msg":"Registration is done"})
    });

    /*      without hashing password  
    
    const user=new UserModel(req.body)
    console.log('req:', req.body)
    await user.save()
    res.status(200).send({"msg":"Registration is done"})

   */

   } catch (error) {
    res.status(400).send({"msg":"Registration is NOT done"})
   }
    })

    
userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body
    // console.log('pass:', pass)
    try {
        const user=await UserModel.findOne({email //,pass
            })
            // console.log('user:', user)
//              decrypting password
        if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
if(result){
    // console.log('result:', result)
    res.status(200).send({"msg":"Login Successfull","token":jwt.sign({ "userID": user._id }, 'bruce')}) 
}else{
    res.status(400).send({"msg":"Login Failed"})
}
        })
    }


   
       } catch (error) {
        res.status(400).send({"msg":"Error"})
       }
   
        })
        

//while Login
// userRouter.post("/login",async (req,res)=>{
//     const {email,pass}=req.body
//     try{
//     const user=await UserModel.find({email})
//     console.log('user:', user)
//     if(user.length>0){
//     bcrypt.compare(pass, user.pass, function(err, result) {
//     if(result){
//     const token = jwt.sign({ course: 'backend' }, 'masai');
//     res.send({"msg":"Login Successfull","token":token})
//     } else {res.send("Wrong Credntials1")}
//     });
//     } else {
//     res.send("Wrong Credntials2")
//     }
//     } catch(err){
//     res.send("Something went wrong")
//     console.log(err)
//     }
//     })
    



    userRouter.get("/details",async(req,res)=>{
            const {token}=req.query
            // console.log('token:', token)
            jwt.verify(token, 'bruce',(err, decoded)=> {
                decoded?   res.status(200).send("user details") :
                res.status(400).send({"msg":"Login required can not acess the restricted route"})
              });
        })


module.exports={
    userRouter
}