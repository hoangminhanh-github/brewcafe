const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize, DataTypes, Model) => {
  const Message = sequelize.define(
    'Message',
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      VendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Vendors',
          key: 'id',
        },
      },
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )
  Message.associate = (models) => {
    Message.belongsTo(models.Vendor, {})
    Message.belongsTo(models.User, {})
  }
  return Message
}
