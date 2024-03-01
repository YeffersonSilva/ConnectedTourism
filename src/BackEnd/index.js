const connection = require("./app/database/connection");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./app/routes/user");
const publicationRoutes = require("./app/routes/publication");
const followRoutes = require("./app/routes/follow");

console.log("connection", connection);

connection();

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", [ userRoutes, publicationRoutes, followRoutes ]);


app.get("/prueba", (req, res) => {
  return res.status(200).json({
    "id": 1,
    "name": "Connected Tourism",
    "description": "A tourism app that connects you to the world",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  console.error('Error starting server:', err);
});
