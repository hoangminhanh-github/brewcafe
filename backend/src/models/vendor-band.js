const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize, DataTypes, Model) => {
  const Vendors_Bands = sequelize.define(
    'Vendors_Bands',
    {
      VendorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      BandId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )

  return Vendors_Bands
}
