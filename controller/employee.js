const {hash} = require("bcrypt");
const Employee = require("../models").User;


module.exports = {
    addEmployee: async (req,res,next)=>{
        try{
            const {firstname,lastname,email,dob,maritalStatus,password} = req.body;
            if(!firstname || !lastname || !email || !dob || !maritalStatus || !password){
               return next("Incomplete fields");
            }
            let user = await Employee.findOne({where:{email}});
            if(user){
               return next("User exists already");
            }
            const hashedPassword = await hash(password,10);
            user = await Employee.create({
                firstname,lastname,email,maritalStatus,dob,password:hashedPassword
            });
            if(!user || user == "undefined"){
               return next("cannot create record");
            }
            return res.json({
                success:true,
                message:"Employee added successfully"
            })

        }catch(err){
            next(err);
        }
    },
    editEmployee: async(req,res,next)=>{
        try{
            const {employeeId} = req.params;
            if(!employeeId || employeeId == "undefined"){
                return next("invalid employee id");
            }
            const isUpdated = await Employee.update({...req.body},{where:{id:employeeId}});
            if(!isUpdated){
               return next("cannot update employee record");
            }
            return res.json({
                success:true,
                message:"record updated successfully"    
            })
        }catch(err){
            next(err);
        }
    },
    getEmployee: async (req,res,next)=>{
        try{
            const {employeeId} = req.params;
            if(!employeeId || employeeId == "undefined"){
                return next("invalid employee id");
            }
            const employee = await Employee.findByPk(employeeId);
            if(!employee || employee == "undefined"){
                return next("cannot get employee");
            }
            return res.json({
                success:true,
                data:employee
            })
        }catch(err){
            next(err);
        }
    },
    getEmployees: async (req,res,next)=>{
        try{
            const employees = await Employee.findAll({});
            return res.json({
                success:true,
                data:employees
            });
        }catch(err){
            next(err);
        }
    },
    deleteEmployee : async (req,res,next)=>{
        try{
            const {employeeId} = req.params;
            const isDeleted = await Employee.destroy({where:{id:employeeId}});
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