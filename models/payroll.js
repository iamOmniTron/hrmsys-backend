module.exports = (sequelize,DataTypes)=>{
    const Payroll = sequelize.define("Payroll",{
        paid:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    },{
        freezeTableName:true,
        timestamps:true
    });

    Payroll.associate = (models)=>{
        Payroll.belongsTo(models.User);
    }
    return Payroll;
}