/**
 * Importa la biblioteca mongoose para trabajar con MongoDB.
 */
const mongoose = require("mongoose");

/**
 * Define un esquema de Publicación (Listing) para la base de datos MongoDB usando mongoose.
 * Este esquema representa la estructura de los datos de las publicaciones en la base de datos.
 * 
 * @typedef {Object} ListingSchema
 * @property {ObjectId} creator - El ID del creador de la publicación, referenciando el modelo Usuario.
 * @property {String} category - La categoría de la publicación, campo requerido.
 * @property {String} type - El tipo de la publicación (p.ej., casa, apartamento), campo requerido.
 * @property {String} streetAddress - La dirección de la calle de la propiedad, campo requerido.
 * @property {String} aptSuite - El número de apartamento o suite, campo requerido.
 * @property {String} city - La ciudad donde se encuentra la propiedad, campo requerido.
 * @property {String} province - La provincia o estado donde se encuentra la propiedad, campo requerido.
 * @property {String} country - El país donde se encuentra la propiedad, campo requerido.
 * @property {Number} guestCount - El número máximo de huéspedes, campo requerido.
 * @property {Number} bedroomCount - El número de habitaciones, campo requerido.
 * @property {Number} bedCount - El número de camas disponibles, campo requerido.
 * @property {Number} bathroomCount - El número de baños disponibles, campo requerido.
 * @property {Array} amenities - Un arreglo que lista las comodidades disponibles, con un valor por defecto de arreglo vacío.
 * @property {Array.<String>} listingPhotoPaths - Un arreglo de cadenas que almacena las URLs de las fotos de la publicación.
 * @property {String} title - El título de la publicación, campo requerido.
 * @property {String} description - La descripción de la publicación, campo requerido.
 * @property {String} highlight - Un destacado o característica principal de la publicación, campo requerido.
 * @property {String} highlightDesc - Descripción del destacado o característica principal, campo requerido.
 * @property {Number} price - El precio de la publicación, campo requerido.
 */
const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default:[]
    },
    listingPhotoPaths: [{ type: String }],
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    highlight: {
      type: String,
      required: true
    },
    highlightDesc: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

/**
 * Crea un modelo de Publicación (Listing) basado en el ListingSchema.
 * Este modelo proporciona una interfaz a la base de datos para crear,
 * consultar, actualizar y eliminar publicaciones.
 * 
 * @type {mongoose.Model}
 */
const Listing = mongoose.model("Listing", ListingSchema);

// Exporta el modelo de Publicación para ser utilizado en otras partes de la aplicación.
module.exports = Listing;
