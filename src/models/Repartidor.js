module.exports = (sequelize, DataType) => {
    const Repartidor = sequelize.define('Repartidor', {
        numIdentificacion: {
            type: DataType.STRING(60),
            allowNull: false,
            unique: true
        },
        nombres: {
            type: DataType.STRING(60),
            allowNull: false
        },
        apellidos: {
            type: DataType.STRING(60),
            allowNull: false
        },
        matriculaMoto: {
            type: DataType.STRING(60),
            allowNull: false
        },
        turno: {
            type: DataType.ENUM,
            values: ['MAÑANA', 'TARDE', 'NOCHE'],
            allowNull: false
        }
    }, { tableName: 'Repartidores' });

    Repartidor.associate = (models) => {
        Repartidor.hasOne(models.Pedido);
        // Repartidor.hasMany(models.PedidoDomicilio);
    };

    return Repartidor;
};