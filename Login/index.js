const mysql = require('mysql2');
const express = require('express');
const app = express();
const path= require('path');
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,'/views'));
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  database: 'loginpage',
  password: 'Nandan@123'
});
//-------------------------------------------------------------

app.get('/',(req,res)=>{
    res.render('home')

});
app.post('/confirm',(req,res)=>{
    var username=req.body.username;
    var password=req.body.password;
    res.render('confirm',{username,password});
    
})

app.post('/done', (req, res) => {
    let password = req.body.password;
    let username = req.body.username;
    let conpassword = req.body.conpassword;

    if (password === conpassword) {
        let q = `INSERT INTO accounts (username,password) VALUES('${username}','${password}')`;
        connection.query(q, (err, result) => {
            if(err){
                res.send('404 ERROR Accouunt Alredy Exists');
            }
            else{
                res.render('created');
            }
        });
    }    
    else {
        res.redirect('/confirm');
            }
});
//-------------------------------------------------------------

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let q = `SELECT * FROM accounts WHERE username='${username}' AND password='${password}'`;
    connection.query(q, (err, result) => {
        console.log(result);
        if (result.length > 0) {
            res.render('successful')
        }
        else {
            res.render('Login_Fail')
        }
    });
})
