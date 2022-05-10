const PayrollDB = require("../models").Payroll;
const User = require("../models").User;
const Profession = require("../models").Profession;

module.exports = {
    payEmployee: async (req,res,next)=>{
        try{
            const {userId} = req.body;
            if(!userId){
                return next("user id is required");
            }
            const paid = await PayrollDB.create({UserId:userId,paid:true});
            if(!paid){
                return next("cannot pay employee");
            }
            return res.json({
                success:true,
                message:"employee paid successfully"
            })
        }catch(err){
            next(err);
        }
    },
    getPayrolls: async(req,res,next)=>{
        try{
            const payrolls = await PayrollDB.findAll({include:[{model:User,include:[{model:Profession}]}]});
            return res.json({
                success:true,
                data:payrolls
            })
        }catch(err){
            next(err);
        }
    }
}