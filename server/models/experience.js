module.exports = function (sequelize, DataTypes) {
  return sequelize.define("experience", {
    satisfaction: DataTypes.STRING,
    observation: DataTypes.STRING,
    crowdLevel: DataTypes.FLOAT,
    travelDuration: DataTypes.INTEGER,
    time: DataTypes.STRING,
    transportMean: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
  });
};
