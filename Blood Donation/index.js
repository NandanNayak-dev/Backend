//SETUP
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const path=require("path")
const Donation=require("./models/donation")
main().then(() => console.log("Database connected"))
.catch(err => console.log(err));

const methodOverride=require("method-override")
app.use(methodOverride("_method"))

app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.listen(8080,()=>{
    console.log("Server started")
})
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/BloodDonation');
}
//-------------------------------------------------------------------------------------------------------------------
app.get('/',(req,res)=>{
    res.render('home.ejs')
})
app.get('/list',async(req,res)=>{
    const allDonors=await Donation.find({})
    res.render('list.ejs',{allDonors})
})
app.get('/back',async(req,res)=>{
  res.redirect("/")
})
app.get('/create',(req,res)=>{
  res.render('create.ejs')
})

app.post('/created',async(req,res)=>{
    console.log(req.body.name)
    console.log(req.body.email)
    console.log(req.body.bloodGroup)
    const newDonor=new Donation({
        name: req.body.name,
        email: req.body.email,
        bloodGroup: req.body.bloodGroup,
        date: new Date()
    })
    try{
        await newDonor.save()
        res.redirect("/list")
    }
    catch(err){
        res.send("Error! Info Already Exists")
    }

    
})

app.get('/groups',(req,res)=>{
    res.render('groups.ejs')
})
app.post('/grouped',async(req,res)=>{
    const bg=req.body.bg
    const allDonors=await Donation.find({bloodGroup:bg})
    if(allDonors.length==0){
        res.render('nodonors.ejs')
    }
    else{
        res.render('finalgrp.ejs',{allDonors})
    }
})