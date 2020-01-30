const mysql = require('mysql');

const config = require('config');
var Bolido = function (data) {
  this.data = data;
};

Bolido.data = {};

Bolido.getBolidos = function(lastId, numElems, camara, fechaIni, fechaFin, ratio, horaIni, horaFin) {
  console.log("Seleccionando aprobados desde:"+lastId+" sacando:"+numElems);
  let elementos = 20;
  let camaras = '';
  let fechaInis = '';
  let fechaFins = '';
  let ratios = '';
  let horaInis = '';
  let horaFins = '';
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    if ( typeof numElems !== 'undefined' && numElems) {
      elementos = numElems;
    }
    if ( typeof camara !== 'undefined' && camara) {
      camaras = ' and camara = '+ camara;
    }
    if ( typeof fechaIni !== 'undefined' && fechaIni) {
      fechaInis = ' and fecha >= \''+ fechaIni + '\'';
    }
    if ( typeof fechaFin !== 'undefined' && fechaFin) {
      fechaFins = ' and fecha <= \''+ fechaFin + '\'';
    }
    if ( typeof ratio !== 'undefined' && ratio) {
      ratios = ' and favor/(favor+contra) >= '+ ratio / 100;
    }
    if ( typeof horaIni !== 'undefined' && horaIni) {
      horaInis = ' and hora > \''+ horaIni  + '\'';
    }
    if ( typeof horaFin !== 'undefined' && horaFin) {
      horaFins = ' and hora < \''+ horaFin + '\'';
    }
    let sql = 'SELECT * FROM videos1.videos where aprobado = 1 and id_video > '+lastId+camaras+fechaInis+fechaFins+ratios+horaInis+horaFins+' order by id_video limit '+elementos+';';
    console.log(sql);
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        //console.log(result);
        con.end();
        resolve(result);
      });
    });
  });
};
Bolido.getTotal = function(camara, fechaIni, fechaFin, ratio, horaIni, horaFin) {
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let camaras = '';
    let fechaInis = '';
    let fechaFins = '';
    let ratios = '';
    let horaInis = '';
    let horaFins = '';
    if ( typeof camara !== 'undefined' && camara) {
      camaras = ' and camara = '+ camara;
    }
    if ( typeof fechaIni !== 'undefined' && fechaIni) {
      fechaInis = ' and fecha >= \''+ fechaIni + '\'';
    }
    if ( typeof fechaFin !== 'undefined' && fechaFin) {
      fechaFins = ' and fecha <= \''+ fechaFin + '\'';
    }
    if ( typeof ratio !== 'undefined' && ratio) {
      ratios = ' and favor/(favor+contra) >= '+ ratio / 100;
    }
    if ( typeof horaIni !== 'undefined' && horaIni) {
      horaInis = ' and hora > \''+ horaIni  + '\'';
    }
    if ( typeof horaFin !== 'undefined' && horaFin) {
      horaFins = ' and hora < \''+ horaFin + '\'';
    }
    let sql = 'SELECT COUNT(*) as numero FROM videos1.videos where aprobado = 1 '+camaras+fechaInis+fechaFins+ratios+horaInis+horaFins+';';
    console.log(sql);
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        console.log('result.numero');
        console.log(result[0].numero);
        con.end();
        resolve(result[0].numero);
      });
    });
  });
};
Bolido.deleteBolido = function(id) {
  console.log("Desaprobando:"+id);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'update videos1.videos set aprobado = 0 where id_video = '+id+';';
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        con.end();
        resolve(result);
      });
    });
  });
};
module.exports = Bolido;
