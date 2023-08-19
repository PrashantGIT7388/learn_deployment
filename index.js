const express=require("express");
const {connection}=require("./db")
const {userRouter}=require("./routes/user.routes")
const {noteRouter}=require("./routes/note.routes")
const {auth}=require("./middleware/auth.middleware")
const cors=require("cors")
require("dotenv").config()

const app=express();
app.use(express.json())

app.use(cors())
app.use("/users",userRouter)
app.use(auth)
app.use("/notes",noteRouter)

// app.post("/register",(req,res)=>{
// res.send("Registrtion is done")
// })

// app.post("/login",(req,res)=>{
//     res.send("Login is done")
//     })

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to the DB");
    } catch (error) {
        console.log('error:', error)
        console.log("Not Connected to the DB");
    }
    console.log(`server is running ${process.env.port}`);
})