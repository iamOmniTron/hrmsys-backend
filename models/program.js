module.exports = (sequelize,DataTypes)=>{
    const Program = sequelize.define("Program",{
        id:{
            type:DataTypes.INTEGER,
            autoIncrement:true,
            allowNull:false,
            primaryKey:true
        },
        EmployeeId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        SkillId:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:true
    });
    Program.associate = (models)=>{
        Program.belongsTo(models.Training);
    }
    return Program;
}