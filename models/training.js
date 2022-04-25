module.exports = (sequelize,DataTypes)=>{
    const Training = sequelize.define("Training",{
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement:true,
            primaryKey:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        duration:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
        freezeTableName:true,
        timestamps:true
    });
    Training.associate = (models)=>{
        Training.hasMany(models.Program);
    }

    return Training;
}