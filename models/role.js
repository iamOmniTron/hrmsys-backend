'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize,DataTypes)=>{
    const Role = sequelize.define("Role",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        }
    },{
        freezeTableName:true
    })

    Role.associate = (models)=>{
        Role.hasOne(models.Admin,{
            foreignKey:{
                allowNull:false
            }
        });

        Role.hasOne(models.User)
    }
    return Role;
}
