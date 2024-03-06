/**
 * Importa la biblioteca mongoose para trabajar con MongoDB.
 */
const mongoose = require("mongoose");

/**
 * Define un esquema de Usuario para la base de datos MongoDB usando mongoose.
 * Este esquema representa la estructura de los datos de los usuarios en la base de datos.
 *
 * @typedef {Object} UserSchema
 * @property {String} firstName - El primer nombre del usuario, campo requerido.
 * @property {String} lastName - El apellido del usuario, campo requerido.
 * @property {String} email - El correo electrónico del usuario, campo requerido y único.
 * @property {String} password - La contraseña del usuario, campo requerido.
 * @property {String} profileImagePath - La ruta de la imagen de perfil del usuario, con un valor por defecto vacío.
 * @property {Array} tripList - Un arreglo que contiene los viajes del usuario, con un valor por defecto de arreglo vacío.
 * @property {Array} wishList - Un arreglo que contiene la lista de deseos del usuario, con un valor por defecto de arreglo vacío.
 * @property {Array} propertyList - Un arreglo que contiene las propiedades del usuario, con un valor por defecto de arreglo vacío.
 * @property {Array} reservationList - Un arreglo que contiene las reservaciones del usuario, con un valor por defecto de arreglo vacío.
 */
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true } // Habilita la creación automática de los campos createdAt y updatedAt.
);

/**
 * Crea un modelo de Usuario basado en el UserSchema.
 * Este modelo proporciona una interfaz a la base de datos para crear,
 * consultar, actualizar y eliminar usuarios.
 *
 * @type {mongoose.Model}
 */
const User = mongoose.model("User", UserSchema);

// Exporta el modelo de Usuario para ser utilizado en otras partes de la aplicación.
module.exports = User;
