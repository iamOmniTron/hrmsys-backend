require("dotenv").config();
const Admin = require("../models").Admin;
const {sign} = require("jsonwebtoken");
const SECRET = process.env.TOKEN_SECRET;
const {compare} = require("bcrypt");
module.exports = {
    Login: async (req,res,next)=>{
        try{
            const {username,password} = req.body;
            if(!username || username == "undefined" || username == ""){
               return next("invalid username");
            }
            if(!password || password == "undefined" || password == ""){
                return next("invalid password");
            }
           const record = await Admin.findOne({where:{username}});
           if(!record || record == "undefined"){
                return res.status(401).json({
                    success:false,
                    message:"unauthenticated"
                });
           }
           const isMatch = await compare(password,record.password);
           if(!isMatch){
               return next("wrong password");
           }
           const token = sign({id:record.id},SECRET,{expiresIn:"1d"});
           return res.json({
               success:true,
               data:token
           });
        }catch(err){
            next("something went wrong");
        }
    }
}