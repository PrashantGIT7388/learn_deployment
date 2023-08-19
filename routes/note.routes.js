//Notes.route.js
const express=require("express")
const noteRouter=express.Router()
const {NoteModel}=require("../model/note.model")
const jwt=require("jsonwebtoken")


//for all the following things authentication is required.
noteRouter.get("/", async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1];
    const decoded=jwt.verify(token,"bruce")
    try {
        if(decoded){
            const notes=await NoteModel.find({"userID":decoded.userID})
             res.status(200).send(notes)
        }
       
    } catch (error) {
        res.status(400).send({"msg":"err.message"})
    }

})


noteRouter.post("/create", async (req,res)=>{
    try {
        const new_note=new NoteModel(req.body)
    await new_note.save()
    res.status(200).send({"msg":"A new note has been created"})
    } catch (error) {
        res.status(400).send({"msg":"err.message"})
    }

})


noteRouter.patch("/update/:noteID",async(req,res)=>{
//logic to update the notes
const payload=req.body;
console.log('payload:', payload)
const noteID=req.params.noteID;
try {
   await NoteModel.findByIdAndUpdate({_id:noteID},payload)
    res.status(200).send({"msg":"A new note has been updated"})
} catch (error) {
    res.status(400).send({"msg":"err.message"})
}
})

noteRouter.delete("/delete/:noteID",async(req,res)=>{
//logic to delete the notes
// const payload=req.body;
const noteID=req.params.noteID;
console.log('noteID:', noteID)
try {
   await NoteModel.findByIdAndDelete({_id:noteID})  //findByIdAndDelete
    res.status(200).send({"msg":"A new note has been updated"})
} catch (error) {
    res.status(400).send({"msg":"err.message"})
}

})


module.exports={
noteRouter
}
//import it in index.js as well.