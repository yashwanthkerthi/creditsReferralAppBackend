const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("creditstask", "root", "@Yashwanth2000", {
  host: "localhost",
  logging: false,
  dialect: "mysql",
});

const auth = async () => {
  try {
    await sequelize.authenticate();
    console.log("connection has been secured");
  } catch (error) {
    console.log("error");
  }
};

auth();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("../models/Users")(sequelize, DataTypes);

db.sequelize.sync({ alter: true });

module.exports = {db}



