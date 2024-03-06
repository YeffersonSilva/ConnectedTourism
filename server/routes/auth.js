/* Importación de módulos necesarios */
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

/**
 * Configuración de Multer para la carga de archivos.
 * Define la ubicación y el nombre de los archivos subidos.
 */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Directorio donde se almacenarán los archivos subidos
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    // Mantener el nombre original del archivo
    cb(null, file.originalname);
  },
});

// Middleware de Multer configurado para el almacenamiento
const upload = multer({ storage });

/**
 * Ruta para el registro de usuarios. Utiliza Multer para gestionar la carga de la imagen de perfil.
 *
 * @route POST /register
 * @param {Express.Request} req - El objeto de solicitud HTTP, que incluye el cuerpo y el archivo de la imagen de perfil.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.post("/register", upload.single("profileImage"), async (req, res) => {
  try {
    // Toma toda la información del formulario
    const { firstName, lastName, email, password } = req.body;

    // El archivo subido está disponible en req.file
    const profileImage = req.file;

    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // Ruta de la foto de perfil subida
    const profileImagePath = profileImage.path;

    // Verifica si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hashea la contraseña
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crea un nuevo usuario
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath,
    });

    // Guarda el nuevo usuario
    await newUser.save();

    // Envía un mensaje de éxito
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

/**
 * Ruta para el login de usuarios.
 *
 * @route POST /login
 * @param {Express.Request} req - El objeto de solicitud HTTP, que incluye el cuerpo con el email y contraseña.
 * @param {Express.Response} res - El objeto de respuesta HTTP para enviar de vuelta al cliente.
 * @access Public
 */
router.post("/login", async (req, res) => {
  try {
    // Toma la información del formulario
    const { email, password } = req.body;

    // Verifica si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(409).json({ message: "User doesn't exist!" });
    }

    // Compara la contraseña con la contraseña hasheada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    // Genera el token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password; // Elimina la contraseña del objeto de usuario antes de enviarlo

    res.status(200).json({ token, user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Exporta el router para su uso en otras partes de la aplicación
module.exports = router;
