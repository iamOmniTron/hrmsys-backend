"use strict";

const {Model} = require("sequelize");

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define("User",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        firstname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        dob:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        maritalStatus:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:true
    });

    User.associate = (models)=>{
        User.belongsTo(models.Role);
        User.hasMany(models.Session,{
            onDelete:"CASCADE"
        });
        User.belongsTo(models.Profession);
    }
    return User;
}