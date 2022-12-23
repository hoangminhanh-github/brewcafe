const { READONLY } = require('sqlite3')
const db = require('./index')
module.exports = (sequelize, DataTypes, Model) => {
  const Product = sequelize.define(
    'Product',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vendorEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Vendors',
          key: 'email',
        },
      },
      bandName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'Bands',
          key: 'name',
        },
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING || DataTypes.INTEGER,
        allowNull: false,
      },
      leftIn: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )

  Product.associate = (models) => {
    Product.belongsTo(models.Vendor, {})
    Product.belongsTo(models.Band, {})
    Product.hasMany(models.ProductImage)
  }

  return Product
}
