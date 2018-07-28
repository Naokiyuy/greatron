module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
    product_category: DataTypes.ENUM('DESKTOP', 'WALLPLUG', 'USBCHARGER', 'WIRELESS'),
    product_name: DataTypes.TEXT,
    product_desc: DataTypes.TEXT,
    product_spec: DataTypes.TEXT,
    pdf_url: DataTypes.TEXT,
    sub_title: DataTypes.TEXT,
    feature: DataTypes.TEXT,
    image_url: DataTypes.TEXT,
    is_index: DataTypes.BOOLEAN,
    is_new: DataTypes.BOOLEAN
  }, {
    timestamps: true,
    paranoid: true,
    underscored: true
  });
};
