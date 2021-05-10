const sequelize = require("../config/db");

const User = sequelize.import("./user");
const Experience = sequelize.import("./experience");

User.hasMany(Experience, { onDelete: "Cascade" });

module.exports = { Experience, User, sequelize };
