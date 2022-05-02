const Session = require("../models").Session;
const User = require("../models").User;

module.exports = {
    getSessions : async (req,res,next)=>{
        try{
            const sessions = await Session.findAll({order:[
                ["id","ASC"]
            ],include:[{
                model:User,
                attributes:["email"]
            }]});
            return res.json({
                success:true,
                data:sessions
            });
        }catch(err){
            next(err);
        }
    },
    getUserSessions : async (req,res,next)=>{
        try{
            const sessions = await Session.findAll({where:{UserId:req.user}});
            return res.json({
                success:true,
                data:sessions
            })
        }catch(err){
            next(err)
        }
    }
}