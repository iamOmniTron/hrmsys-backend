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
        middlename:{ // new field
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
        psm:{ // new field
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        phone:{ // new field
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        // date of appointment
        doa:{ // new field
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        // date of retirement
        dor:{ // new field
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        // status. whether user has retired, is on leave, training or active
        // with values 4 3, 2, 1 respectively
        // the retired status should be set on on demand. i.e when fetching employes, check employees dor and compare it with the current date. if it's equal to current date of after current date, the  then employee has retired and as such, his status should be set to 4 and stored back in the db
        status:{ // new field
            type:DataTypes.INTEGER,
            allowNull:false,
            default: 1
        },
        dob:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{ // new field
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
        User.hasOne(models.Payroll);
    }
    return User;
}