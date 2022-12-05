import express from "express";
import passport from "passport";
import {login,googleCallback } from "../controllers/userControllers.js";
const router = express.Router()
import "../config/passport.js"

router.route("/login").get(login)

// Google OAuth
router.route("/google").get(passport.authenticate("google",{
    scope:["profile","email"]
}))
router.route('/google/callback').get(passport.authenticate('google'),googleCallback)


export default router;