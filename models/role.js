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
        },

        // salary to be paid to employees at this level
        salary: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        // each employee gets additional pay after given moths based on level
        salaryIncrement: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
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
