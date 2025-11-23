const express = require('express');
const app = express();
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const port = 8080;


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.get('/register',(req,res)=>{
    res.render("response",{dataname:req.query.username,datapass:req.query.password});
  })