module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull:true
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull:true
      },
      email: {
        type: DataTypes.STRING,
        allowNull:false
      },
      password: {
        type: DataTypes.STRING,
        allowNull:true
      },
      role: {
        type: DataTypes.STRING,
        allowNull:true
      },
      credits: {
        type: DataTypes.INTEGER,
        defaultValue:0
    },
      referralCode:{
        type:DataTypes.STRING,
        allowNull:true
      }
    },
    {
      timestamps: false,
    }
  );
  return User;
};
