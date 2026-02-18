const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname,"public")))

const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

//------------------MONGOOSE CONNECTION------------------------

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/authDemo");
}
main().then(() => console.log("connected to database")).catch((err) => console.log(err));
//-----------------------------------------------------------------------------------

const sessionOptions={
  secret:"mysupersecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires:Date.now()+7*24*60*60*1000,
    maxAge:7*24*60*60*1000,
    httpOnly:true
  }
};

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
  res.locals.success=req.flash("success");
  res.locals.error=req.flash("error");
  next();
})

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//          username: "demouser", 
//          email: "sBxR8@example.com" });
//     let registeredUser = await User.register(fakeUser, "demopassword");
//     res.send(registeredUser);
// })
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", async (req, res) => {
    try{
        let { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser=await User.register(newUser, password);
    req.flash("success","Welcome to the site!");
    res.redirect("/login");
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
})

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}), (req, res) => {
  req.flash("success","Logged in successfully!");
res.redirect("/signup");
});



app.listen(8080, () => {
  console.log("server is listening to port 8080");
});