const express = require("express");
const cors = require("cors");

const app = express();

let cosrOptions = {
  origin: "http://localhost:8080",
};

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("conectado a la base de datos");
  })
  .catch((err) => {
    console.log("no se pudo conectar a la base de datos", err);
    process.exit();
  });

app.use(cors(cosrOptions));

//adaptamos el formato del contenido del req
app.use(express.json());

// adaptamosel formato de las URLs
app.use(express.urlencoded({ extended: true }));


require("./app/routes/playlist.routes")(app);
require("./app/routes/songs.routes")(app);


//seteamos el puerto de entrada
const port = process.env.port || 8080;
app.listen(port, () => {
  console.log("server running on port ", port);
});
