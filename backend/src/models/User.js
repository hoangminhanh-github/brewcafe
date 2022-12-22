const { READONLY } = require('sqlite3')
const db = require('./index')
module.exports = (sequelize, DataTypes, Model) => {
  const User = sequelize.define(
    'User',
    {
      permission: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'User',
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

  // User.associate = (models) => {
  //   User.belongsTo(models.Account, {
  //     onDelete: 'CASCADE',
  //   })
  // }

  return User
}
