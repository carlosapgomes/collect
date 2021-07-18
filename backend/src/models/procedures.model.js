// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const procedures = sequelizeClient.define('procedures', {
    descr: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    procDateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    execPlace:{
      type: DataTypes.STRING,
      allowNull: false
    },
    ptName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ptRecN: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ptID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ptDateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ptAge: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    ptGender: {
      type: DataTypes.ENUM('M', 'F'),
      allowNull: false
    },
    ptWard: {
      type: DataTypes.STRING,
      allowNull: true
    },
    ptBed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    team:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userLicenceNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdByUserName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdByUserID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedByUserName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    updatedByUserID: {
      type: DataTypes.STRING,
      allowNull: false
    },}, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  procedures.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return procedures;
};
