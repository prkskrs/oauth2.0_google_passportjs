import passport from "passport";
import googleStrategy from "passport-google-oauth20";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
      });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });


var GoogleStrategy =  googleStrategy.Strategy;
// console.log(GoogleStrategy)

// Show consent screen and send token on url
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8000/v1/api/auth/google/callback",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  // Ask for info with token and send infromations
  (accessToken, refreshToken, profile, next)=>{
    // console.log(profile)
    User.findOne({ email: profile._json.email })
        .then(user=>{
            if(user){
                console.log("User already exists in Database");
                next(null,user)
                // cookieToken()
            }
            else{
                User.create({
                    name:profile.displayName,
                    googleId:profile.id,
                    email:profile._json.email 
                }).then(user=>{
                    // console.log("New User ", user)
                    next(null,user)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }
)}))


