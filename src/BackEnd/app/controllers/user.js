

const pruebaUser = (req, res) => {
    return res.status(200).send({ message: 'Hola mundo' });
}

module.exports = {
    pruebaUser
}