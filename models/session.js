module.exports = (sequelize,DataTypes)=>{
    const Session = sequelize.define("Session",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncremen:true,
            allowNull:false
        },
        timeIn: {
            type:DataTypes.DATE,
            allowNull:false,
            defualtValue:DataTypes.NOW,
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