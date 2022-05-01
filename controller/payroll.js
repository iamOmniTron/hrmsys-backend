const PayrollDB = require("../models").Payroll;

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
    }
}