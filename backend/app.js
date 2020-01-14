const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const videosRoutes = require("./routes/videos");
const bolidosRoutes = require("./routes/bolidos");
const testLiveRoute = require("./routes/testLive");
const readVenusRoutes = require("./routes/readVenus");
const mediaRoutes = require("./routes/media");
const getRandomVideoRoutes = require("./routes/getRandomVideo");
const userRoutes = require('./routes/user');
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname,"angular")));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/videos", videosRoutes);
app.use("/api/bolidos", bolidosRoutes);
app.use("/api/testLive",testLiveRoute);
app.use("/api/ReadVenus",readVenusRoutes);
app.use("/api/media/eventos",mediaRoutes);
app.use("/api/getRandomVideo",getRandomVideoRoutes);
app.use("/api/user", userRoutes);
app.use((req,res,next)=>{
  console.log("Recibido path:"+req.protocol+req.hostname+req.path);
  res.sendFile(path.join(__dirname,"angular","index.html"));

});
module.exports = app;
