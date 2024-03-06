/* Importación de módulos necesarios */
const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");

/**
 * Configuración de Multer para la carga de archivos de fotos de las publicaciones.
 * Define el directorio de destino y el nombre de los archivos subidos.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se almacenarán los archivos subidos
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // Usar el nombre original del archivo
    cb(null, file.originalname);
  },
});

// Middleware de Multer configurado para el almacenamiento
const upload = multer({ storage });

/**
 * Ruta para crear una nueva publicación. Utiliza Multer para gestionar la carga de múltiples fotos de la publicación.
 *
 * @route POST /create
 * @param {Express.Request} req - El objeto de solicitud HTTP, que incluye el cuerpo con los datos de la publicación y los archivos de las fotos.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.post("/create", upload.array("listingPhotos"), async (req, res) => {
  try {
    // Toma la información del formulario
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    // Obtiene los archivos de fotos subidos
    const listingPhotos = req.files;

    if (!listingPhotos) {
      return res.status(400).send("No file uploaded.");
    }

    // Mapea las rutas de las fotos para almacenarlas en la base de datos
    const listingPhotoPaths = listingPhotos.map((file) => file.path);

    // Crea una nueva instancia de Listing con los datos recibidos
    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    // Guarda la nueva publicación en la base de datos
    await newListing.save();

    // Si la publicación se guarda correctamente, envía una respuesta con estado 200
    res.status(200).json(newListing);
  } catch (err) {
    // En caso de error, envía una respuesta con estado 409 y el mensaje de error
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
    console.log(err);
  }
});

/**
 * Ruta para obtener publicaciones por categoría.
 *
 * @route GET /
 * @param {Express.Request} req - El objeto de solicitud HTTP, puede incluir una consulta de categoría.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    // Filtra las publicaciones por categoría si se proporciona, de lo contrario, obtiene todas las publicaciones
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    // Envía las publicaciones encontradas con estado 200
    res.status(200).json(listings);
  } catch (err) {
    // En caso de error, envía una respuesta con estado 404 y el mensaje de error
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/**
 * Ruta para obtener publicaciones mediante una búsqueda por texto.
 *
 * @route GET /search/:search
 * @param {Express.Request} req - El objeto de solicitud HTTP, incluye el parámetro de búsqueda.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    // Si la búsqueda es "all", obtiene todas las publicaciones, de lo contrario, realiza una búsqueda por categoría o título
    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    // Envía las publicaciones encontradas con estado 200
    res.status(200).json(listings);
  } catch (err) {
    // En caso de error, envía una respuesta con estado 404 y el mensaje de error
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    console.log(err);
  }
});

/**
 * Ruta para obtener los detalles de una publicación específica por su ID.
 *
 * @route GET /:listingId
 * @param {Express.Request} req - El objeto de solicitud HTTP, incluye el ID de la publicación como parámetro.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    // Busca la publicación por su ID y pobla el campo del creador
    const listing = await Listing.findById(listingId).populate("creator");
    // Envía los detalles de la publicación con estado 202
    res.status(202).json(listing);
  } catch (err) {
    // En caso de error, envía una respuesta con estado 404 y el mensaje de error
    res
      .status(404)
      .json({ message: "Listing cannot be found!", error: err.message });
  }
});

// Exporta el router para su uso en otras partes de la aplicación
module.exports = router;
