import bigPromise from "../middlewares/bigPromise.js";


export const login = bigPromise(async(req,res,next)=>{
    res.render("../views/login.ejs");
})

export const googleLogin = bigPromise(async(req,res,next)=>{
    res.send("login with google");
})

export const googleCallback = bigPromise(async(req,res,next)=>{
    console(req.user)
    res.send(req.user)
})