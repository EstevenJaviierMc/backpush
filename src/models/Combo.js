module.exports = (sequelize, DataType) => {
    const Combo = sequelize.define('Combo', {
        codigo: {
            type: DataType.STRING,
            allowNull: false
        },
        numCombo: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataType.STRING(60),
            allowNull: false,
            unique: true
        },
        descripcion: {
            type: DataType.TEXT,
            allowNull: false
        }
    });

    Combo.associate = (models) => {
        // Combo.hasMany(models.Producto);
        // Combo.belongsTo(models.Pedido);
    };

    return Combo;
};