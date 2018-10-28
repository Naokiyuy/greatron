module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Aboutus', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    title: DataTypes.TEXT,
    description: DataTypes.TEXT
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
