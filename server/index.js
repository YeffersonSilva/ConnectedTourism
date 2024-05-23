// Importación de módulos necesarios
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const listingsRoutes = require('./routes/listingsRoutes'); // Asegúrate de que la ruta es correcta

// Configuración de la aplicación Express
const app = express();
app.use(cors());
app.use(express.json()); // Para parsear application/json
app.use(express.static("public")); // Para servir archivos estáticos

// Importación de rutas
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");
const eventRoutes = require("./routes/eventRoutes.js");
const adminRoutes = require("./routes/admin.js");
const adminPublicaciones = require("./routes/adminPublicaciones.js");

// Configuración de rutas
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);
app.use("/events", eventRoutes);
app.use("/admin", adminRoutes);
app.use("/adminPublicaciones", adminPublicaciones);
app.use('/listings', listingsRoutes);

const setupSwagger = require("./routes/swagger.js");
setupSwagger(app);

// MongoDB setup
mongoose.connect(process.env.MONGO_URL, { dbName: "Dream_Nest" })
    .then(() => {
        console.log("Connected to MongoDB");
        // Inicio del servidor una vez establecida la conexión a la base de datos
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection error: ", err);
    });
