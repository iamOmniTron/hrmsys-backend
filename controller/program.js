const Program = require("../models").Program;

module.exports = {
    joinProgram: async (req,res,next)=>{
        try{
            const {skillId,trainingId} = req.body;
            if(!skillId){
                return next("skill is required");
            }
            const program = await Program.create({EmployeeId:req.user,SkillId:skillId,TrainingId:trainingId});
            if(!program || program == "undefined"){
                return next("cannot create program");
            }

            return res.json({
                success:true,
                message:"program created successfully"
            })
        }catch(err){
            next(err)
        }
    },
    getUserPrograms : async (req,res,next)=>{
        try{
            const programs = await Program.findAll({where:{EmployeeId:req.user}});
            return res.json({
                success:true,
                data:programs
            })
        }catch(err){
            next(err);
        }
    }
}