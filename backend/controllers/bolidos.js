const Bolido = require("../models/bolidos");
const ratio = require("../models/ratio");
const votos = require("../models/votos");
var fs = require('fs');
var fileName = '../../config/default.json';
var file = require(fileName);

const config = require('config');
var lRatio = 0.5;
var lVotos = 5;
exports.getBolidos = (req, res, next) => {
  console.log("Estamos en controllers getVideo by id");
  Bolido.getBolidos(req.params.id,
    req.query.pageSize, req.query.camara,req.query.fechaIni,req.query.fechaFin,
    req.query.ratio, req.query.horaIni, req.query.horasFin)
    .then(Bolidos => {
      if (Bolidos) {
        res.status(200).json({
          Bolidos
        });
      } else {
        res.status(404).json({ message: "Video not found!" });
      }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
exports.getTotal = (req, res, next) => {
  console.log("Estamos en controllers get total");
  Bolido.getTotal(req.query.camara,req.query.fechaIni,req.query.fechaFin,
    req.query.ratio, req.query.horaIni, req.query.horasFin).then(numero => {
    if (numero || numero === 0) {
      res.status(200).json(numero);
    } else {
      res.status(404).json({ message: "Video not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
exports.deleteBolido = (req, res, next) => {
  console.log("Estamos en controllers getVideo by id");
  Bolido.deleteBolido(req.params.id).then(Bolidos => {
    if (Bolidos) {
      res.status(200).json({
        Bolidos
      });
    } else {
      res.status(404).json({ message: "Video not found!" });
    }
  })
    .catch(error => {
      res.status(500).json({
        message: "Fetching Video failed!"
      });
    });
};
exports.getRatioVotos = (req, res, next) => {

  let lr;
  let lv;
  lr = config.get('Umbral.ratio');
  lv = config.get('Umbral.votos');
  console.log('GetRatiovotos'+lr+lv);
  res.status(200).json({
    ratio: lr,
    votos: lv
  });
};
exports.changeRatio = (req, res, next) => {
  console.log('Recibido:'+req.query.ratio);
  let lr;
  let lv;
  file.ConexionBasededatos = {
    host: config.get('ConexionBasededatos.host'),
    port: config.get('ConexionBasededatos.port'),
    user: config.get('ConexionBasededatos.user'),
    password: config.get('ConexionBasededatos.password')};
  lr = config.get('Umbral.ratio');
  lv = config.get('Umbral.votos');
  lr = req.query.ratio;
  lv = req.query.votos;
  file.Umbral = {
    ratio: lr,
    votos: lv
  };
  console.log(process.cwd());

  fs.writeFile('./config/default.json', JSON.stringify(file), function (err) {
    if (err) return console.log(err);
    console.log(JSON.stringify(file));
    console.log('writing to ' + fileName);
  });
  res.status(200).json({
    ratio: lr,
    votos: lv
  });
};
