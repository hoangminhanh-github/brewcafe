const { READONLY } = require('sqlite3')
const db = require('./index')
const { v4: uuidv4 } = require('uuid')
module.exports = (sequelize, DataTypes, Model) => {
  const Admin = sequelize.define(
    'Admin',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Admin',
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

  // Admin.associate = (models) => {
  //   Admin.belongsTo(models.Account, {
  //     onDelete: 'CASCADE',
  //   })
  // }

  return Admin
}
