
const config = require('config');
var ratioAprobacion = function () {
  this.ratio = 0.5;
};


ratioAprobacion.cambiarRatio = function (ratio) {
  let localRatio;
  localRatio = config.get('Umbral.ratio');
  localRatio = ratio;
  return config.get('Umbral.ratio');
}
ratioAprobacion.getRatio = function () {
  return config.get('Umbral.ratio');
}
module.exports = ratioAprobacion;
