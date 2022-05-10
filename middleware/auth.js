require("dotenv").config();
const {verify} = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;
const User = require("../models").User;
const Admin = require("../models").Admin;

module.exports = {
    auth: async(req,_,next)=>{
        try{
            const header = req.headers["authorization"];
            if(!header || typeof header !== "string"){
                return next("unauthenticated");
            }
            const token = header.split(" ")[1];
            if(!token || typeof token !== "string"){
                return next("unauthenticated");
            }
            const payload = verify(token,SECRET);
            //check if user is a user
            const user = await User.findOne({where:{id:payload.id}});
            console.log(user);
            if(!user){
                // check if he's an admin
                const admin = await Admin.findOne({where:{id:payload.id}});
                if(!admin || admin == "undefined"){
                    return next("bad request");
                }
                req.isAdmin = true;
                req.userId = admin.id;
                return next();
            }
            req.isAdmin = false;
            req.user = user.id;
            return next();

        }catch(err){
            return next(err);
        }
    },
    requireAdminAccess: (req,_,next)=>{
        try{
            const isAdmin = req.isAdmin;
            if(!isAdmin){
                return next("unauthorzed");
            }
            return next();
        }catch(err){
            return next(err);
        }
    }
}