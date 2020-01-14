var votosAprobacion = function () {
  this.votos = 5;
};
votosAprobacion.cambiarVotos= function (votos) {
  this.votos = votos;
  return this.votos;
}
votosAprobacion.getVotos = function () {
  return this.votos;
}
module.exports = votosAprobacion;
