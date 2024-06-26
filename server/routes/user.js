/* Importación de módulos necesarios */
const router = require("express").Router();

const Booking = require("../models/Booking");
const User = require("../models/User");
const Listing = require("../models/Listing");

/**
 * Ruta para obtener la lista de viajes (reservas) de un usuario específico.
 *
 * @route GET /:userId/trips
 * @param {Express.Request} req - Objeto de solicitud HTTP, incluye el ID del usuario en los parámetros de la ruta.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */

/**
 * @openapi
 * /users/{userId}/trips:
 *   get:
 *     tags:
 *       - Visited
 *     summary: Retrieve all trips made by a user
 *     description: Fetches a list of all bookings (trips) made by the specified user. Each booking includes details about the customer, host, and listing associated with the booking.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose trips are being retrieved.
 *     responses:
 *       202:
 *         description: A list of trips made by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Booking'
 *       404:
 *         description: No trips found for the user or an error occurred while fetching the trips.
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
router.get("/:userId/trips", async (req, res) => {
  try {
    const { userId } = req.params;
    // Encuentra todas las reservas hechas por el usuario y las relaciona con los modelos correspondientes
    const trips = await Booking.find({ customerId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(trips);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find trips!", error: err.message });
  }
});

/**
 * Ruta para añadir o eliminar una publicación de la lista de deseos de un usuario.
 *
 * @route PATCH /:userId/:listingId
 * @param {Express.Request} req - Objeto de solicitud HTTP, incluye los ID del usuario y de la publicación en los parámetros de la ruta.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.patch("/:userId/:listingId", async (req, res) => {
  try {
    const { userId, listingId } = req.params;
    const user = await User.findById(userId);
    const listing = await Listing.findById(listingId).populate("creator");

    // Comprueba si la publicación ya está en la lista de deseos para añadirla o eliminarla
    const favoriteListing = user.wishList.find(
      (item) => item._id.toString() === listingId
    );

    if (favoriteListing) {
      // Elimina la publicación de la lista de deseos si ya está presente
      user.wishList = user.wishList.filter(
        (item) => item._id.toString() !== listingId
      );
      await user.save();
      res
        .status(200)
        .json({
          message: "Listing is removed from wish list",
          wishList: user.wishList,
        });
    } else {
      // Añade la publicación a la lista de deseos si no está presente
      user.wishList.push(listing);
      await user.save();
      res
        .status(200)
        .json({
          message: "Listing is added to wish list",
          wishList: user.wishList,
        });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ error: err.message });
  }
});

/**
 * Ruta para obtener la lista de propiedades creadas por un usuario.
 *
 * @route GET /:userId/properties
 * @param {Express.Request} req - Objeto de solicitud HTTP, incluye el ID del usuario en los parámetros de la ruta.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.get("/:userId/properties", async (req, res) => {
  try {
    const { userId } = req.params;
    // Encuentra todas las publicaciones creadas por el usuario
    const properties = await Listing.find({ creator: userId }).populate(
      "creator"
    );
    res.status(202).json(properties);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find properties!", error: err.message });
  }
});

/**
 * Ruta para obtener la lista de reservaciones recibidas por un usuario (como anfitrión).
 *
 * @route GET /:userId/reservations
 * @param {Express.Request} req - Objeto de solicitud HTTP, incluye el ID del usuario en los parámetros de la ruta.
 * @param {Express.Response} res - Objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
/**
 * @openapi
 * /users/{userId}/reservations:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Retrieve all reservations for a user as a host
 *     description: This endpoint retrieves all reservations where the specified user acts as the host.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user/host whose reservations are being retrieved.
 *     responses:
 *       202:
 *         description: A list of reservations for the host
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Reservation'
 *       404:
 *         description: Reservations not found or error in fetching reservations.
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
router.get("/:userId/reservations", async (req, res) => {
  try {
    const { userId } = req.params;
    // Encuentra todas las reservaciones donde el usuario actúa como anfitrión
    const reservations = await Booking.find({ hostId: userId }).populate(
      "customerId hostId listingId"
    );
    res.status(202).json(reservations);
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ message: "Can not find reservations!", error: err.message });
  }
});

// Exporta el router para su uso en otras partes de la aplicación
module.exports = router;
