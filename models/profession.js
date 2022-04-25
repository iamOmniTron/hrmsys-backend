"use strict";


const {Model} = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
    const Profession = sequelize.define("Profession",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    },{
        freezeTableName:true,
        timestamps:true
    });

    Profession.associate = (models)=>{
        Profession.hasOne(models.User);
        Profession.belongsTo(models.Salary);
    }
    return Profession;
}