const Profession = require("../models").Profession;
const Salary = require("../models").Salary

module.exports = {
    addProfession: async (req,res,next)=>{
        try{
            
            const {name,salary} = req.body;
            if(!name || name == "undefined"){
               return next("profession name is required");
            }
            if(!salary||salary == "undefined"){
                return next("salary is required");
             }
            const profession = await Profession.create({
                name,salary
            });
            if(!profession){
               return next("error creating profession");
            }

            return res.json({
                success:true,
                message:"record added successfully"
            })
        }catch(err){
            next(err);
        }
    },
    editProfession: async (req,res,next)=>{
        try{
            const {professionId} = req.params;
            if(!professionId || professionId == "undefined"){
                return next("invalid profession id ")
            }
            const isUpdated = await Profession.update({...req.body},{where:{id:professionId}});
            if(!isUpdated){
                return next("cannot update record");
            }
            return res.json({
                success:true,
                message:"record updated successfully"
            })
        }catch(err){
            next(err);
        }
    },
    getProfession: async (req,res,next)=>{
        try{

            const {professionId} = req.params;
            if(!professionId || professionId == "undefined"){
                return next("invalid profession id ")
            }

            const profession = await Profession.findOne({where:{id:professionId}});
            if(!profession){
                return next("cannot find profession")
            }

            return res.json({
                success:true,
                data:profession
            })
        }catch(err){
            next(err)
        }
    },
    getProfessions: async (req,res,next)=>{
        try{
            const professions = await Profession.findAll();
            return res.json({
                success:true,
                data:professions
            })
        }catch(err){
            next(err);
        }
    },
    deleteProfession : async (req,res,next)=>{
        try{
            const {professionId} = req.params;
            const isDeleted = await Profession.destory({where:{id:professionId}});
            if(!isDeleted){
                return next("cannot delete record");
            }

            return res.json({
                success:true,
                message:"record deleted successfully"
            })
        }catch(err){
            next(err);
        }
    }
}