const express = require("express");
const {sequelize} = require("./models");
const path = require("path");
const Admin = require("./models").Admin;
const Skill = require("./models").Vocation;
const {hash} = require("bcrypt");
const cors = require("cors");
const app = express();
const router = require("./routes");
(async ()=>{
    try{
        
    console.log("\n Connecting To Database...");
    await sequelize.authenticate();
    console.log("\ Connection established");
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
    // await sequelize.sync({force:true}); 
    await sequelize.sync();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    await Admin.create({
        username:"Admin",
        password: await hash("admin123",10)
    });
    await Skill.bulkCreate([
        {name:"cyber security"},
        {name:"human relations"},
        {name:"game development"},
        {name:"system repairs"},
        {name:"web design"}
    ])
    console.log("\Database Synchronized");
    }catch(err){
        console.log(err.message)
    }
}
)();

app.use(cors({
    origin:"*"
}));
app.use(express.static(__dirname +"/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/",router);
app.use((err,req,res,next)=>{
    if(err instanceof Error){
        console.log(err);
        return res.status(500).json({
            success:false,
            message: "Something went wrong"
        });
    }

    return res.status(500).json({
        success:false,
        error:err
    })
})

module.exports = app;