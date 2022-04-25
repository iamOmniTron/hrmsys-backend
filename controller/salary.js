const Salary = require("../models").Salary;

module.exports = {
    getSalaries: async (req,res,next)=>{
        try{
            const salaries = await Salary.findAll();

            return res.json({
                success:true,
                data:salaries
            })
        }catch(err){
            next(err);
        }
    }
}