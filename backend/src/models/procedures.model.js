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
    user1Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user1LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user1ID: {
      type: DataTypes.STRING,
      allowNull: false
    },
    user2Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user2LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user2ID: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    user3Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user3LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user3ID: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    user4Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user4LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user4ID: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user5Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user5LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user5ID: {
      type: DataTypes.STRING,
      allowNull: true
    },    
    user6Name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user6LicenceNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user6ID: {
      type: DataTypes.STRING,
      allowNull: true
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
