const mysql = require('mysql');
const config = require('config');
var Video = function (data) {
  this.data = data;
};

Video.data = {};
Video.findById = function(id) {
  console.log("Buscando elemento:"+id);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'SELECT * FROM videos1.videos where id_video = '+id+';';
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        resolve(result);
      });
    });
  });
};

Video.deleteOne= function(id) {
  console.log("Borrando elemento:"+id);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'DELETE FROM videos1.videos where id_video = '+id+';';
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        resolve("OK");
      });
    });
  });
};
Video.saltar= function(id) {
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'UPDATE videos1.videos set saltar = saltar +1 where id_video = '+id+';';
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        resolve("OK");
      });
    });
  });
};
Video.votoPositivo= function(id) {
  console.log("Votando positivo a elemento:"+id);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'UPDATE videos1.videos set favor = favor +1 where id_video = '+id+';';
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        sql = 'SELECT favor, contra from videos1.videos where id_video = '+id+';';
        con.query(sql, function (err, result) {
          if (err){
            throw err;reject();
          }
          console.log('Resultado despues de votar positivo');
          console.log(result);
          const favor = result[0].favor;
          const contra = result[0].contra;
          const ratio = favor/(contra+favor);
          const umbralRatio = config.get('Umbral.ratio');
          const umbralVotos = config.get('Umbral.votos');
          if (ratio >= umbralRatio && favor >= umbralVotos){
            sql = 'UPDATE videos1.videos set aprobado = 1 where id_video = '+id+';';
            con.query(sql, function (err, result) {
              if (err){
                throw err;reject();
              }
              con.end();
              resolve("OK");
            });
          } else{
            con.end();
            resolve('OK');
          }

        });
      });
    });
  });
};

Video.votoNegativo= function(id, avion, rayo, eei, otro) {
  console.log("Votando negativo a elemento:"+id);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let rayos = '';
    let aviones = '';
    let eeis = '';
    let otros = '';
    if ( typeof rayo !== 'undefined' && rayo) {
      rayos = ', rayo = rayo +1 ';
    }
    if ( typeof avion !== 'undefined' && avion) {
      aviones = ', avion = avion +1 ';
    }
    if ( typeof eei !== 'undefined' && eei) {
      eeis = ', eei = eei +1 ';
    }
    if ( typeof otro !== 'undefined' && otro) {
      otros = ', otro = otro +1 ';
    }
    let sql = 'UPDATE videos1.videos set contra = contra +1 ' + rayos + aviones + eeis + otros + ' where id_video = '+id+';';
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
        con.end();
        resolve("OK");
      });
    });
  });
};
module.exports = Video;
