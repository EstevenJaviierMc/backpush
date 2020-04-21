module.exports = (sequelize, DataType) => {
    const Cliente = sequelize.define('Cliente', {
        nombre: {
            type: DataType.STRING(60),
            allowNull: false
        },
        direccion: {
            type: DataType.STRING(60),
            allowNull: false
        },
        telefono: {
            type: DataType.STRING(20),
            allowNull: false,
            unique: true
        }
    });

    Cliente.associate = (models) => {
        Cliente.hasOne(models.Pedido);
    };

    return Cliente;
};