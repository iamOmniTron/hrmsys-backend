"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
    const Salary = sequelize.define("Salary",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        amount:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timeStamps:true
    });

    Salary.associate = (models)=>{
        Salary.hasOne(models.Profession);
    }

    return Salary;
}