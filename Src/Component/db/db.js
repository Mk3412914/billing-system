const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("billing_db", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Database connection failed:", err);
  });

module.exports = sequelize;