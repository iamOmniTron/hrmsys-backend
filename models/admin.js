"use strict";

const {Model} = require("sequelize");


module.exports = (sequelize,DataTypes)=>{
    const Admin = sequelize.define("Admin",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timeStamps:true
    });

    Admin.associate = (models)=>{
        Admin.belongsTo(models.Role)
    }

    return Admin;
}