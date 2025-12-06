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
