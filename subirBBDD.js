const mysql = require('mysql');
const fs = require('fs');
console.log('Subir Videos');
const rutaEventos ='videos/eventos/';
const config = require('config');
principal(rutaEventos);
async function principal(rutaEventos) {
  let lastID, lastMember;
  let sql;
  const con = mysql.createConnection({
    host: config.get('ConexionBasededatos.host'),
    port: config.get('ConexionBasededatos.port'),
    user: config.get('ConexionBasededatos.user'),
    password: config.get('ConexionBasededatos.password')
  });
  sql = 'SELECT id_video FROM videos1.videos ORDER BY id_video DESC LIMIT 1;';
  await  getLastID(con, sql).then(function (result) {
    lastID = result;
  });
  console.log('LastID:'+lastID);
  sql = 'SELECT fecha, hora FROM videos1.videos where id_video = '+lastID+';';
  await getLastMember(con,sql).then(function (result) {
    lastMember = result;
  });
  console.log('LastMember:');console.log(lastMember);

  let eventos;
  await leerDirectorio(rutaEventos).then((datos)=>{
    eventos = datos;
  });
  for(let i=0;i<eventos.length;i++){
    let horalarga,nombre;
    let objeto,fechaEvento;
    let localizacion,camara,universidad,provincia,fecha, anno, mes, dia, hora, minuto, segundo;
    //console.log("Evento("+i+"):"+eventos[i]);
    [nombre,horalarga] = eventos[i].split('--');
    [hora,minuto,segundo] = horalarga.split('-');
    [camara,universidad,provincia,anno,mes,dia] = nombre.split('-');
    localizacion = universidad+'-'+provincia;
    camara = camara.split('cam')[1];
    horalarga=hora+':'+minuto+':'+segundo;
    fecha = anno+'-'+mes+'-'+dia;
    objeto={camara: camara, fecha:fecha,hora:horalarga,ubicacion:eventos[i]};
    //console.log(objeto);

    fechaEvento = new Date(anno+'-'+mes+'-'+dia+'T'+hora+':'+minuto+':'+segundo);
    fechaEvento = new Date(fechaEvento.getTime()-fechaEvento.getTimezoneOffset()*60*1000);

    if(fechaEvento.getTime()>lastMember.getTime()){
      await subir(con,objeto).then(resultado =>{
        console.log("Subido evento("+resultado+"):");
      });
      console.log("Terminado?")
    }else{
      console.log("Menor");
      console.log("FechaEvento");
      console.log(fechaEvento);
      console.log(lastMember);
    }
  }
  //con.end();
}
function getLastID(con,sql) {
  return new Promise( async function (resolve, reject) {
    let lastID;
    con.connect(function(err) {
      if (err){
        throw err;
        reject();
      }
      //console.log("Connected LastID!");
      //console.log('SQL interior:'+sql);
      con.query(sql, function (err, result) {
        if (err){
          throw err;reject();
        }
        lastID = result[0].id_video;
        //console.log('Elemento:'+result[0].id_video);
        resolve(lastID);
      });
      //

    });

  });
}
function getLastMember(con,sql) {
  return new Promise( async function (resolve, reject) {
    let lastMember;
    let fecha, hora, anno, mes, dia, hh, minuto, segundo;
    //console.log("Connected LastID!");
    //console.log('SQL interior:'+sql);
    con.query(sql, function (err, result) {
      if (err){
        throw err;reject();
      }
      //console.log(result);
      fecha = new Date(result[0].fecha);
      //console.log(fecha.getTime());
      anno = fecha.getFullYear()
      mes = fecha.getMonth()+1;
      dia = fecha.getDate();
      hora = result[0].hora;
      //console.log(hora);
      [hh,minuto,segundo] = hora.split(':');
      hh = hh - fecha.getTimezoneOffset()/60;
      if(hh<10) hh = '0'+hh;
      //console.log(hh);
      //lastMember = {anno:anno,mes:mes,dia:dia,hora:hh,minuto:minuto,segundo:segundo};
      //console.log(anno+'-'+mes+'-'+dia+'T'+hh+':'+minuto+':'+segundo);
      lastMember = new Date(anno+'-'+mes+'-'+dia+'T'+hh+':'+minuto+':'+segundo);

      //console.log(lastMember.getTime());
      //console.log('Elemento:');console.log(lastMember);
      resolve(lastMember);
    });
    //

  });
}
function leerDirectorio(directorio) {
  return new Promise(async function (resolve, reject) {
    await fs.readdir(directorio, function (err,elementosEventos) {
      if(err){
        console.log("error"+err.message);
        reject("error"+err.message);
      }else{
        resolve(elementosEventos);
      }

    });
  });
}
function subir(con,objeto) {
  return new Promise(async function (resolve,reject){

    let sql = 'INSERT INTO videos1.videos (camara,fecha,hora,ubicacion,aprobado,favor,contra) values ('+objeto.camara+',\''+objeto.fecha+'\',\''+objeto.hora+'\',\''+objeto.ubicacion+'\',0,0,0);';
    console.log(sql);
    con.query(sql, function (err, result) {
      if (err){
        throw err;reject();
      }
      console.log("Subidos:"+result.affectedRows);
      resolve(objeto.ubicacion);
    });
    //

  });
}
