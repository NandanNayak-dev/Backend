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
app.delete('/:id',(req,res)=>{
    let id=req.params.id;
    console.log(id);
    todos.splice(id,1);
    res.redirect('/');
})

app.get('/:id',(req,res)=>{
    res.render('edit',{id:req.params.id})
})
app.patch('/:id',(req,res)=>{
    let value=req.body.content;
    let id=req.params.id;
    todos[id]=value;
    res.redirect('/');
})

app.listen(port,()=>console.log(`Server running on port ${port}`));