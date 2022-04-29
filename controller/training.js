const Training = require("../models").Training;

module.exports = {
    addTraining: async (req,res,next)=>{
        try{
            const {name,duration}= req.body;
            if(!name || name == "undefined"){
                return next("invalid name")
            }
            const skill = await Training.create({
                name,duration
            });
            if(!skill){
                next("cannot create training");
            }

            return res.json({
                success:true,
                message:"training added successfully"
            })
        }catch(err){
            console.log(err);
            next(err)
        }
    },
    editTraining: async (req,res,next)=>{
        try{
            const {trainingId} = req.params;
            if(!trainingId || trainingId == "undefined"){
                return next("invalid training id");
            }
            const isUpdated = await Training.update({...req.body},{where:{id:trainingId}});
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
    getTraining: async (req,res,next)=>{
        try{
            const {trainingId} = req.params;
            if(!trainingId || trainingId == "undefined"){
                return next("invalid training id");
            }
            const training = await Training.findByPk(trainingId);
            if(!training){
                return next("cannot find record")
            }
            return res.json({
                success:true,
                data:training
            })
        }catch(err){
            next(err);
        }
    },
    getTrainings: async (req,res,next)=>{
        try{
            const trainings = await Training.findAll();
            if(!skills){
                return next("no record found");
            }

            return res.json({
                sucess:true,
                data:trainings
            })
        }catch(err){
            next(err);
        }
    },
    deleteTraining: async (req,res,next)=>{
        try{
            const {trainingId} = req.params;
            if(!trainingId){
                return next("invalid training id")
            }

            const isDeleted = await Training.destroy({where:{id:trainingId}});
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