const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const Todo=require("./models/todo")

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
  await mongoose.connect('mongodb://127.0.0.1:27017/TODOAPP');
}
app.get('/',(req,res)=>{
    res.send("home")
})
//----------------------------------Routes----------------------------
app.get('/todos',async(req,res)=>{
    try{
        const todos=await Todo.find({})
        
        res.render("index",{todos})
    }
    catch(err){
        next(err)
    }
})
app.delete('/todos/:id',asyncWrap(async(req,res,next)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.redirect('/todos')
}))

//Async wrapper function to handle errors in async functions
function asyncWrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch(next)
    }
}
//================================


//=================================
//Error handling
app.use((err,req,res,next)=>{
    console.log(err)
    res.status(500).send("Something went wrong")
})
app.use((req,res)=>{
    res.status(404).send("Page Not Found")
})