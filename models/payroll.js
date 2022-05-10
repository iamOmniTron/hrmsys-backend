module.exports = (sequelize,DataTypes)=>{
    const Payroll = sequelize.define("Payroll",{
        month:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
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