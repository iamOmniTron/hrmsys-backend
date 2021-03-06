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
        middlename:{
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
        psm:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        phone:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true
        },
        lastPromotionDate:{
            type: DataTypes.DATEONLY,
        },
        yearsTillPromotion:{
            type: DataTypes.INTEGER
        },
        doa:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        country:{
          type:DataTypes.STRING,
        },
        hometown:{
          type:DataTypes.STRING,
        },
        state:{
          type:DataTypes.STRING,
        },
        contactAddress:{
          type:DataTypes.STRING
        },
        dor:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        status:{
            type:DataTypes.INTEGER,
            allowNull:false,
            defaultValue: 1
        },
        dob:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:true
    });

    User.associate = (models)=>{
        User.belongsTo(models.Profession);
        User.hasOne(models.Payroll);
        User.belongsTo(models.Training);
    }
    return User;
}
