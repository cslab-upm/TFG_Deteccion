const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
console.log('Montar Videos');
let ruta = 'videos/eventos';
console.log(ruta);
async function correr(ruta){
  let eventos;
  await leerDirectorio(ruta).then((datos)=>{
    eventos = datos;
  });
  console.log(eventos);
  for(let i=0;i<eventos.length;i++){
    console.log("Evento:"+i);
    let ruta = __dirname+'/videos/eventos/'+eventos[i]+'/evento.mp4';
    if(!fs.existsSync(ruta)){
      await llamarFFMPEG(eventos[i]).then((resultado)=>{
        console.log(resultado);
      });
    }

  }
  return;
}
correr(ruta).then(()=>{
  return console.log("done");
});

async function llamarFFMPEG(evento){
  return new Promise((resolve,reject)=>{
    let ruta = __dirname+'/imagenes/eventos/'+evento+'/image-%d.jpeg';
    console.log(ruta);
    ffmpeg(ruta)
      .outputFps(24)
      .addOutput('videos/eventos/'+evento+'/evento.mp4')
      .on('end',function() {
        resolve('Transcoding succeeded !');
      })
      .on('error',function(err) {
        console.log('Transcoding failed !'+err.message);
        reject('Transcoding failed !'+err.message);
      })
      .run();
  });
}
function leerDirectorio(directorio) {
  return new Promise(async function (resolve, reject) {
    await fs.readdir(ruta, function (err,elementosEventos) {
      if(err){
        console.log("error"+err.message);
        reject("error"+err.message);
      }else{
        resolve(elementosEventos);
      }

    });
  });
}

