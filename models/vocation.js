module.exports = (sequelize,DataTypes)=>{
    const Vocation = sequelize.define("Vocation",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            allowNull:false,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{
        freezeTableName:true,
        timestamps:true
    });
    return Vocation;
}