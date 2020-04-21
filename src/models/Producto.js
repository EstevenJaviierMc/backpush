module.exports = (sequelize, DataType) => {
    const Producto = sequelize.define('Producto', {
        codigo: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        nombre: {
            type: DataType.STRING(60),
            allowNull: false,
            unique: true
        },
        precio: {
            type: DataType.DECIMAL(10, 2),
            allowNull: false
        }
    });

    Producto.associate = (models) => {
    };

    return Producto;
};