// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
// Procedures Types
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const proctypes = sequelizeClient.define('proctypes', {
    // description
    descr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // procedure code 
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // is a surgical report required?
    requireSurgReport: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  },
  {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  proctypes.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return proctypes;
};
