module.exports = (sequelize, DataType) => {
    const Pedido = sequelize.define('Pedido', {
        numPedido: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        fecha: {
            type: DataType.DATE,
            allowNull: false
        },
        hora: {
            type: DataType.TIME,
            allowNull: false
        },
        numCaja: {
            type: DataType.STRING,
            allowNull: false
        },
        tipo: {
            type: DataType.ENUM,
            values: ['CAJA', 'DOMICILIO'],
            allowNull: false
        }

    });

    Pedido.associate = (models) => {
        Pedido.belongsTo(models.Cliente);
        Pedido.belongsTo(models.Repartidor);
        // Pedido.hasMany(models.Combo);
    };

    return Pedido;
};