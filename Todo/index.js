const express=require('express');
const app=express();
const port=8080;
const path=require('path');
const methodOverride = require('method-override')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

let todos=[];

app.get('/',(req,res)=>{
    res.render('index',{todos});
});
app.get('/create',(req,res)=>{
    res.render('create')
})

app.post('/create',(req,res)=>{
    
    let value=req.body.todo;
    todos.push(value);
    console.log(value);
    res.redirect('/');
})

app.listen(port,()=>console.log(`Server running on port ${port}`));