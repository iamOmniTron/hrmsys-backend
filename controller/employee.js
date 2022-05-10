require("dotenv").config();
const {hash, compare} = require("bcrypt");
const Employee = require("../models").User;
const fs = require("fs");
const path = require("path");
const {sign} = require("jsonwebtoken");
const Profession = require("../models").Profession;
const Salary = require("../models").Salary;
const SECRET = process.env.TOKEN_SECRET;


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
            user = await Employee.create({password:hashedPassword,...req.body});
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
            let isUpdated;
            if("password" in req.body){
                isUpdated = await Employee.update({...req.body},{where:{id:employeeId}});
            }else{
                isUpdated =await Employee.update({...req.body},{where:{id:employeeId}});
            }
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
    login:async(req,res,next)=>{
        try{
            const {email,password} = req.body;
            if(!email || email == "undefined"){
                return next("email is required");
            }
            if(!password || password == "undefined"){
                return next("password is required");
            }

            const employee = await Employee.findOne({where:{email}});
            if(!employee || employee == "undefined"){
                return next("user doesnt exist");
            }
            const isPasswordMatch = await compare(password,employee.password);
            if(!isPasswordMatch){
                return next("invalid email/password");
            }
            const token = sign({id:employee.id},SECRET,{expiresIn:"1d"});
            return res.json({
                success:true,
                data:token
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
            const employee = await Employee.findByPk(employeeId,{include:[{model:Profession}]});
            if(!employee || employee == "undefined"){
                return next("cannot get employee");
            }
            if(employee.dor >= new Date(Date.now())){
                await employee.update({
                    status:4
                });
                await employee.save();
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
            const employees = await Employee.findAll({include:[{model:Profession}]});
            employees.forEach(async(emp)=>{
                if(emp.dor >= new Date(Date.now())){
                    await emp.update({
                        status:4
                    });
                    await emp.save();
                }
            })
            return res.json({
                success:true,
                data:employees
            });
        }catch(err){
            next(err);
        }
    },
    getMailAddresses: async (req,res,next)=>{
        try{
            const names = await Employee.findAll({attributes:["email"]});
            return res.json({
                success:true,
                data:names
            })
        }catch(err){
            next(err);
        }
    }
    ,
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
    },
    getUrls : async (req,res,next)=>{
        try{
            const {email} = req.params;
            if(!email || email == "undefined") return next("invalid email");
            const payload = email.split("@")[0];
            const dir =  path.join(__dirname +`/..`+ `/public/uploads/${payload}`);
            fs.readdir(dir,(err,files)=>{
                if(err){
                    console.log(err);
                    return next("cannot get results");
                }
            return res.json({
                success:true,
                data:files
            })
            })

        }catch(err){
            next(err);
        }
    },
    joinTraining: async(req,res,next)=>{
        try{
            const {trainingId} = req.params;
            const userId = req.user;
            const isUpdated = await Employee.update({TrainingId:trainingId,status:2},{where:{id:userId}});
            if(!isUpdated){
                return next("cannot join training program");
            }
            return res.json({
                success:true,
                message:"training program joined successfully"
            })
        }catch(err){
            next(err);
        }
    },
    getEmployeesSalaries : async (req,res,next)=>{
        try{
            const salaries = await Employee.findAll({attributes:["email","id"],include:[{model:Profession,attributes:["name"],include:[{model:Salary,attributes:["amount"]}]}]});

            return res.json({
                success:true,
                data:salaries
            })
        }catch(err){
            next(err);
        }
    },
    getProfile: async (req,res,next)=>{
        try{
            const userId = req.user;
            const user = await Employee.findByPk(userId,{include:[{model:"Profession"}]});
            return res.json({
                success:true,
                data:user
            })
        }catch(err){
            next(err);
        }
    }
}