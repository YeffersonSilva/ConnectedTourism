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

/**
 * @openapi
 * /create:
 *   post:
 *     tags:
 *       - Booking
 *     summary: Create a new booking
 *     description: This endpoint creates a new booking in the database with the details provided by the client.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - customerId
 *               - hostId
 *               - listingId
 *               - startDate
 *               - endDate
 *               - totalPrice
 *             properties:
 *               customerId:
 *                 type: string
 *                 description: The ID of the customer making the booking.
 *               hostId:
 *                 type: string
 *                 description: The ID of the host of the listing.
 *               listingId:
 *                 type: string
 *                 description: The ID of the listing being booked.
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the booking.
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the booking.
 *               totalPrice:
 *                 type: number
 *                 format: float
 *                 description: Total price of the booking.
 *     responses:
 *       200:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Error in creating the booking
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
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
