const express = require("express");
const router = express.Router();
var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var url = 'http://venus.datsi.fi.upm.es/allsky_montegancedo/files/';
var newUrl;
var dirEvento;
var eventos = [], imagenes = [];
async function bajarImagenesVenus(){
  await llamadaCarpetas(url).then(function(resultado) {
    console.log(resultado);
    eventos = resultado;
  });
  for (let i=0; i< eventos.length;i++){
    newUrl=url+eventos[i];
    //console.log(newUrl);
    await llamadaCarpetasImagenes(newUrl).then(function (resultado) {
      console.log('Evento('+eventos[i]+'):'+resultado.length);
      imagenes.push(resultado);
    })
  }
  for (let i=0; i< eventos.length;i++){
    let yaDescargado = false;
    if(!fs.existsSync('imagenes/eventos/'+eventos[i])){
      fs.mkdirSync('imagenes/eventos/'+eventos[i]);
    }else{
      yaDescargado = true;
    }
    if(!fs.existsSync('videos/eventos/'+eventos[i])){
      fs.mkdirSync('videos/eventos/'+eventos[i]);
    }else{
      yaDescargado = true;
    }
    if(!yaDescargado){
      for(let k=0;k<imagenes[i].length;k++){
        newUrl=url+eventos[i]+imagenes[i][k];
        //dirEvento = 'imagenes/eventos/'+eventos[i]+imagenes[i][k];
        dirEvento = 'imagenes/eventos/'+eventos[i]+'image-'+k+'.jpeg';
        //console.log('Url: +'+newUrl+'\t dirImagen: '+dirEvento);
        await descargaImagenes(newUrl,dirEvento).then(function () {
          //console.log('Imagen terminada');
        })
      }
    }
  }
}
async function principal(){
  console.log('Iniciamos descarga');
  await bajarImagenesVenus();
  console.log("Terminada descarga de imagenes");
  console.log('Fin readVenus');
}
//principal();
function download(uri, filename, callback){
  return new Promise(resolve => {
    request.head(uri, function (err, res, body) {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
    resolve();
  });
};
function llamadaCarpetas(url){
  return new Promise(function (resolve, reject) {
    request(url, function(err, resp, body){
      let arrayElem = []
      $ = cheerio.load(body);
      links = $('a');
      $(links).each(function(i, link){
        if($(link).attr('href').includes('cam') && i< 105){
          //console.log("Evento añadido");
          arrayElem.push($(link).attr('href'));
        }
      });
      resolve(arrayElem);
    });
  });
}
function descargaImagenes(newUrl,dirEvento){
  return new Promise(async function (resolve, reject) {
    await download(newUrl,dirEvento,function () {
      resolve();
    });

  });
}
function llamadaCarpetasImagenes(url){
  return new Promise(function (resolve, reject) {
    request(url, function(err, resp, body){
      let arrayElem = []
      $ = cheerio.load(body);
      links = $('a');
      $(links).each(function(i, link){
        if($(link).attr('href').includes('jpeg')){
          //console.log("Imagen añadido");
          arrayElem.push($(link).attr('href'));
        }
      });
      resolve(arrayElem);
    });
  });
}

module.exports = router;
