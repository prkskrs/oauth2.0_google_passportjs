import express  from "express";
import "./config/db.js";
import auth from "./routes/auth.js"
const app = express()
import passport from "passport"
import session from "express-session"

app.set('view engine','ejs')

// Server Health Check
app.get("/",(req,res,next)=>{
    res.render("home");
})

// Auth Routes
app.use("/v1/api/auth",auth) 

// Passport Middlewares
app.use(passport.initialize());
app.use(passport.session());

// express session
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.listen(8000,()=>{
    console.log(`http://localhost:${8000}`);
})