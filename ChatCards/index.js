const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const Chat=require("./models/chat")
const ExpressError=require("./ExpressError")
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
  try{
    let chats=await Chat.find();
  console.log(chats.length)
  res.render("index",{chats:chats})
  }
  catch(e){
    next(e);
  }
  
})
//New chat
app.get("/chats/new",(req,res)=>{
  // throw new ExpressError(404,"Page Not Found")
  res.render("new.ejs")
})

app.post("/chats", asyncWrap(async(req,res,next)=>{
  
    let from=req.body.from;
  let to=req.body.to;
  let msg=req.body.msg;
  let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })
  await newChat.save();
  res.redirect("/chats")

}))
//******************** Async Wrapper to handle errors in async functions ********************//
//********************/
function asyncWrap(fn){
  return function(req,res,next){
    fn(req,res,next).catch(err=>next(err));
  }
}

//Update
app.get("/update/:id",asyncWrap(async(req,res,next)=>{
    let id=req.params.id;
  let chats=await Chat.findById( req.params.id);
  if(!chats){
    next(new ExpressError(404,"Chat Not Found"))
  } 
  res.render("update.ejs",{id:req.params.id,from:chats.from,to:chats.to,msg:chats.msg})
  
}))
//Patch
app.patch("/update/:id",asyncWrap(async(req,res)=>{
    let id=req.params.id;
  let newmsg=req.body.msg;
  await Chat.findByIdAndUpdate(id,{$set:{msg:newmsg}});
  res.redirect("/chats")
  
  
}))
//Delete
app.delete("/chats/:id", asyncWrap(async(req,res)=>{
    let id=req.params.id;
  await Chat.findByIdAndDelete(id);
  res.redirect("/chats")
}))

const handleValidationErr=(err)=>{
  console.log(err.message);
  return err;
}

app.use((err,req,res,next)=>{
  console.log(err.name)
  if(err.name==="ValidationError"){
    err=handleValidationErr(err);
  }
  next(err);
})

app.use((err,req,res,next)=>{
  let {status=500,message="Something went wrong"}=err;
  res.status(status).send(message);
})
//Error handling middleware^^^^

