const express = require('express');
const app = express();
const port = 8080;
const path = require('path');

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"public")))
app.use(express.static(path.join(__dirname,"/public/js")))
app.use(express.static(path.join(__dirname,"/public/css")))
app.use(express.static(path.join(__dirname,"/public/images")))

app.get("/",(req,res)=>{
    res.render("home")
})

app.get("/twitter/:username",(req,res)=>{
    // res.send(req.params.username)
    let data=require("./details.json")
    for(let i=0;i<10;i++){
        if(data[i].name==req.params.username){
            res.render("details",{data:data[i]})
            break;
        }
        if(i==9&&data[i].name!=req.params.username){
           res.render("notfound")
        }
    }

    
})



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
