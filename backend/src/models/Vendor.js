const { READONLY } = require('sqlite3')
const db = require('./index')
module.exports = (sequelize, DataTypes, Model) => {
  const Vendor = sequelize.define(
    'Vendor',
    {
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Vendor',
        READONLY,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      lastLogin: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )
  Vendor.associate = (models) => {
    Vendor.belongsToMany(models.Band, { through: 'Vendors_Bands' })
  }

  // Vendor.associate = (models) => {
  //   Vendor.belongsTo(models.Account, {
  //     onDelete: 'CASCADE',
  //   })
  // }

  return Vendor
}
