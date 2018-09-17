module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Category', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    category: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
