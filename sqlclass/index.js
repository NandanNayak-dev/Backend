const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();
const path= require('path');
app.set('view engine', 'ejs');
app.set("views",path.join(__dirname,'/views'));

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.use(express.urlencoded({ extended: true }));







const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  database: 'delta_app',
  password: 'Nandan@123'
});



function getRandomUser() {
  return [
    faker.string.uuid(),           // id
    faker.internet.username(),     // username
    faker.internet.email(),        // email
    faker.internet.password()      // password
  ];
}




// connection.end();
//Home route
app.get("/", (req, res) => {
  let q=`SELECT count(*) FROM user7`;

  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let count=result[0]['count(*)'];
      console.log(result)
      res.render("home.ejs",{count:count});

    });
  }catch(e){
    console.log(e);
    res.send("Error occurred");
  }
});

//Show route
app.get("/user",(req,res)=>{
  let q=`SELECT * FROM user7`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      res.render("showusers.ejs",{user:result});

    });
  }catch(e){
    console.log(e);
    res.send("Error occurred");
  }
    
});

//Edit route
app.get("/user/:id/edit",(req,res)=>{
  let id=req.params.id;
  let q=`SELECT * FROM user7 WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      res.render("edit.ejs",{user:result[0]});

    });
  }catch(e){
    console.log(e);
    res.send("Error occurred");
  }
  
})

//Update db
app.patch("/user/:id",(req,res)=>{
  let formpassword=req.body.password;
  let newusername=req.body.username;
  let id=req.params.id;
  let q=`SELECT * FROM user7 WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      let user=result[0];
      if(user.password===formpassword){
        let updateQ=`UPDATE user7 SET username='${newusername}' WHERE id='${id}'`;
        connection.query(updateQ,(err,result)=>{
          if(err) throw err;
          res.redirect("/user");
        });
      }
      else{
        res.send("Password incorrect");
      }
    });
  }
  catch(e){
    console.log(e);
    res.send("Error occurred");
  }
});

app.get("/user/new",(req,res)=>{
  res.render("new.ejs");
})
app.post("/user/new",(req,res)=>{
  let newUser=req.body.newuser;
  let newpassword=req.body.newpassword;
  console.log(req.body);
  try{
    let q=`INSERT INTO user7 (id,username,email,password) VALUES ('${faker.string.uuid()}','${newUser}','${faker.internet.email()}','${newpassword}')`;
    connection.query(q,(err,result)=>{
      if(err) throw err;
      res.redirect("/user");
    });
  }
  catch(e){
    console.log(e);
    res.send("Error occurred");
  }
})

app.delete("/user/:id",(req,res)=>{
  let id=req.params.id;
  
  let q=`DELETE FROM user7 WHERE id='${id}'`;
  try{
    connection.query(q,(err,result)=>{
      let user=result[0];
      if(err) throw err;
      
      res.redirect("/user");
    });
  }
  catch(e){
    console.log(e);
    res.send("Error occurred");
  }
})




app.listen(8080, () => {
  console.log('Server is running on port 3000');
});