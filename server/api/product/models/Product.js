module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    product_name: DataTypes.TEXT,
    created_time: DataTypes.DATE
  });
};
