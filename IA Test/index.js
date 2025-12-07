//-----------------------------------------------------------
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
//-----------------------------------------------------------

const connection = mysql.createConnection({
  host: 'localhost',
  user: "root",
  database: 'marks',
  password: 'Nandan@123'
});
//HOME ROUTE
app.get("/", (req, res) => {
  let q=`SELECT * FROM student`;

  try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      console.log(result)
      res.render("home",{data:result});

    });
  }catch(e){
    console.log(e);
    res.send("Error occurred");
  }
});
//VIEW ROUTE
app.get("/home/:usn/:name", (req, res) => {
  let usn=req.params.usn;
  var name=req.params.name;
  console.log(name)
  let q=`SELECT * FROM marks WHERE usn='${usn}'`;

 try{
    connection.query(q,(err,result)=>{
      if(err) throw err;
      console.log(result);
      res.render("individual",{data:result[0],name:name});

  });
}
catch(e){
    console.log(e);
    res.send("Error occurred");
  }
});

//ADD STUDENT ROUTE
app.get("/add",(req,res)=>{
  res.render("add");
})
app.post("/home",(req,res)=>{
  var name=req.body.name;
  var usn=req.body.usn;
  var email=req.body.email;
  console.log(name);
  console.log(usn);
  console.log(email);
  let q1=`INSERT INTO student (usn,name,email) VALUES ('${usn}','${name}','${email}')`;
  try{
    connection.query(q1,(err,result)=>{
      if(err) throw err;
      
      let q2=`INSERT INTO marks (usn,marksIA1,marksIA2,marksIA3) VALUES ('${usn}','${req.body.marksIA1}','${req.body.marksIA2}','${req.body.marksIA3}')`;
      connection.query(q2,(err,result)=>{
        if(err) throw err;
        res.redirect("/");
      });
})
}
catch(e){
    console.log(e);
    res.send("Error occurred");
  }
  
});
