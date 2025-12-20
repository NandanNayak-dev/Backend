const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const Chat=require("./models/chat")

const methodOverride=require("method-override")
app.use(methodOverride("_method"))

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
main().then(() => console.log("Database connected"))
.catch(err => console.log(err));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.listen(8080,()=>{
    console.log("Server started")
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
//-------------------------------------------------------------------------------------------------------------------


//Index route
app.get('/chats',async(req,res)=>{
  let chats=await Chat.find();
  console.log(chats.length)
  res.render("index",{chats:chats})
})
//New chat
app.get("/chats/new",(req,res)=>{
  res.render("new.ejs")
})

app.post("/chats",(req,res)=>{
  let from=req.body.from;
  let to=req.body.to;
  let msg=req.body.msg;
  let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })
  newChat.save();
  res.redirect("/chats")
  
})
//Update
app.get("/update/:id",async(req,res)=>{
  let chats=await Chat.findById( req.params.id);
  res.render("update.ejs",{id:req.params.id,from:chats.from,to:chats.to,msg:chats.msg})
})
//Patch
app.patch("/update/:id",async(req,res)=>{
  let id=req.params.id;
  let newmsg=req.body.msg;
  await Chat.findByIdAndUpdate(id,{$set:{msg:newmsg}});
  res.redirect("/chats")
  
})
//Delete
app.delete("/chats/:id",async(req,res)=>{
  let id=req.params.id;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats")
})
