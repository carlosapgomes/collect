// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const patients = sequelizeClient.define('patients', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    gender: {
      type: DataTypes.ENUM('M','F'),
      allowNull: false
    },
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    recordNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  patients.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return patients;
};
