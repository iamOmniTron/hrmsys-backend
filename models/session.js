module.exports = (sequelize,DataTypes)=>{
    const Session = sequelize.define("Session",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        timeIn: {
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW,
        },
        timeOut:{
            type:DataTypes.DATE
        }
    },{
        freezeTableName:true,
        timestamps:true
    });

    Session.associate = (models)=>{
        Session.belongsTo(models.User,{
            constraints:false
        });
    }
    return Session;
}