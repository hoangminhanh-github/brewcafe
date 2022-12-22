const { READONLY } = require('sqlite3')
const db = require('./index')
module.exports = (sequelize, DataTypes, Model) => {
  const ProductImage = sequelize.define(
    'ProductImage',
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: true,
      timestamps: true,
    },
  )
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product)
  }

  return ProductImage
}
