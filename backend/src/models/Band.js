const db = require('./index')
// const { sequelize } = require('models')
const { DataTypes, Model } = require('sequelize')

module.exports = (sequelize, DataTypes, Model) => {
  const Band = sequelize.define(
    'Band',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )
  Band.associate = (models) => {
    Band.belongsToMany(models.Vendor, { through: 'Vendors_Bands' })
    Band.hasMany(models.Product, {})
  }
  // .belongsToMany(Actor, { through: 'ActorMovies' });
  return Band
}
