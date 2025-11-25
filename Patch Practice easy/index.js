const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}));
////////////////////////////////

app.use(express.static(path.join(__dirname,'public')));

////////////////////////////////
let name="Nandan";
let age=20;

app.get('/',(req,res)=>{
    res.render('index',{name,age});
})
app.get('/about',(req,res)=>{
    res.render('about');
})
app.patch('/',(req,res)=>{
    name=req.body.name;
    age=req.body.age;
    res.redirect('/');
})







app.listen(port,()=>{
    console.log(`server is running at ${port}`);
})