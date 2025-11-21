const express = require('express');
const app=express();
const path=require("path");////////
const port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));///////////


app.use(express.static(path.join(__dirname,"public")));/////////
app.use(express.static(path.join(__dirname,"/public/js")));/////////

app.get("/",(req,res)=>{
    let diceValue = Math.floor(Math.random() * 6) + 1; // 
    res.render("instagram",{diceValue});
});

app.get("/ig/:username",(req,res)=>{
    const instaData=require("./data.json")
    let username=req.params.username;
    let data=instaData[username]

    if(data){
        res.render("instagram",{username,data});
    }else{
        res.render("error");
    }
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});