const Skill = require("../models").Vocation;

module.exports = {
    addSkill: async (req,res,next)=>{
        try{
            const {name}= req.body;
            if(!name || name == "undefined"){
                return next("invalid name")
            }
            const skill = await Skill.create({
                name
            });
            if(!skill){
                next("cannot create skill");
            }

            return resjson({
                success:true.valueOf,
                message:"vocation added successfully"
            })
        }catch(err){
            next(err)
        }
    },
    editSkill: async (req,res,next)=>{
        try{
            const {skillId} = req.params;
            if(!skillId || skillId == "undefined"){
                return next("invalid skill id");
            }
            const isUpdated = await Skill.update({...req.body},{where:{id:skillId}});
            if(!isUpdated){
                return next("cannot update record");
            }

            return res.json({
                success:true,
                message:"record updated successfully"
            })
        }catch(err){
            next(err)
        }
    },
    getSkill: async (req,res,next)=>{
        try{
            const {skillId} = req.params;
            if(!skillId || skillId == "undefined"){
                return next("invalid skill id");
            }
            const skill = await Skill.findByPk(skillId);
            if(!skill){
                return next("cannot find record")
            }
            return res.json({
                success:true,
                data:skill
            })
        }catch(err){
            next(err);
        }
    },
    getSkills: async (req,res,next)=>{
        try{
            const skills = await Skill.findAll();
            if(!skills){
                return next("no record found");
            }

            return res.json({
                sucess:true,
                data:skills
            })
        }catch(err){
            next(err);
        }
    },
    deleteSkill: async (req,res,next)=>{
        try{
            const {skillId} = req.params;
            if(!skillId){
                return next("invalid skill id")
            }

            const isDeleted = await Skill.destroy({where:{id:skillId}});
            if(!isDeleted){
                return next("cannot delete record")
            }
            return res.json({
                success:true,
                message:"vocation deleted successfully"
            })
        }catch(err){
            next(err);
        }
    }
}