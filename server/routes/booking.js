/* Importación del módulo router de express para definir rutas en la aplicación */
const router = require("express").Router();

/* Importación del modelo Booking para interactuar con la colección de reservas en la base de datos */
const Booking = require("../models/Booking");

/**
 * Ruta para crear una nueva reserva.
 * Recibe los datos de la reserva a través del cuerpo de la solicitud (body) y crea una nueva reserva en la base de datos.
 *
 * @route POST /create
 * @param {Express.Request} req - El objeto de solicitud HTTP, incluye el cuerpo con los datos de la reserva: customerId, hostId, listingId, startDate, endDate, totalPrice.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.post("/create", async (req, res) => {
  try {
    // Extracción de los datos necesarios del cuerpo de la solicitud
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } =
      req.body;

    // Creación de una nueva instancia de Booking con los datos recibidos
    const newBooking = new Booking({
      customerId,
      hostId,
      listingId,
      startDate,
      endDate,
      totalPrice,
    });

    // Guardado de la nueva reserva en la base de datos
    await newBooking.save();

    // Si la reserva se guarda correctamente, se envía una respuesta con estado 200 y los datos de la reserva
    res.status(200).json(newBooking);
  } catch (err) {
    // En caso de error, se registra el error en la consola y se envía una respuesta con estado 400 y el mensaje de error
    console.log(err);
    res
      .status(400)
      .json({ message: "Fail to create a new Booking!", error: err.message });
  }
});

// Exportación del router para su uso en otras partes de la aplicación
module.exports = router;
