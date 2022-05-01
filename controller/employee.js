require("dotenv").config();
const {hash, compare} = require("bcrypt");
const Employee = require("../models").User;
const fs = require("fs");
const path = require("path");
const Session = require("../models").Session;
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
            await Session.update({timeOut:Date.now()},{where:{timeOut:null,UserId:employee.id}});
            const sess = await Session.create({UserId:employee.id});
            const token = sign({id:employee.id,sId:sess.id},SECRET,{expiresIn:"1d"});

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
    logout:async (req,res,next)=>{
        try{
            const {user,sid} = req;
            if(!sid || sid == "null"){
                return next("unauthorized");
            }
            const isUpdated = await Session.update({timeOut:Date.now()},{where:{UserId:userId}});
            if(!isUpdated){
                return next("cannont sign out");
            }
            return res.json({
                success:true,
                message:"user signed out successfully"
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
    }
}