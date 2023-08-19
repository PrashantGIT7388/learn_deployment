//middlwares/authenticate.middleware.js
const jwt=require("jsonwebtoken")

const auth = (req,res,next)=>{
const token=req.headers?.authorization?.split(" ")[1]

if(token){
const decoded=jwt.verify(token,"bruce")

if(decoded){
    req.body.userID=decoded.userID
next()
} else {
res.send("Please Login")
}
} else {
res.send("Please Login")
}
}

module.exports={
auth
}