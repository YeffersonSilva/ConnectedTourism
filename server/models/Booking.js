/**
 * Importa la biblioteca mongoose para trabajar con MongoDB.
 */
const mongoose = require("mongoose");

/**
 * Define un esquema de Reserva para la base de datos MongoDB usando mongoose.
 * Este esquema representa la estructura de los datos de reserva en la base de datos.
 * 
 * @typedef {Object} BookingSchema
 * @property {ObjectId} customerId - El ID del usuario que realiza la reserva, referenciando el modelo Usuario.
 * @property {ObjectId} hostId - El ID del usuario anfitrión de la publicación, referenciando el modelo Usuario.
 * @property {ObjectId} listingId - El ID de la publicación que se reserva, referenciando el modelo Publicación.
 * @property {string} startDate - La fecha de inicio de la reserva, campo requerido.
 * @property {string} endDate - La fecha de fin de la reserva, campo requerido.
 * @property {number} totalPrice - El precio total de la reserva, campo requerido.
 */
const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  {
    // Habilita la creación automática de los campos createdAt y updatedAt
    timestamps: true,
  }
);

/**
 * Crea un modelo de Reserva basado en el BookingSchema.
 * Este modelo proporciona una interfaz a la base de datos para crear,
 * consultar, actualizar y eliminar reservas.
 * 
 * @type {mongoose.Model}
 */
const Booking = mongoose.model("Booking", BookingSchema);

// Exporta el modelo de Reserva para ser utilizado en otras partes de la aplicación.
module.exports = Booking;
