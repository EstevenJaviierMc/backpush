module.exports = app => {
    const { Pedido, Cliente } = app.config.db.models;


    app.get('/', async (req, res) => {
        try {
            const pedidos = await Cliente.findAll({
                include: { model: Pedido }
            });

            res.json(pedidos);
        } catch (error) {
            console.log(error);

        }


    });
}