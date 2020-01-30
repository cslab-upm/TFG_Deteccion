let fs      = require('fs')
let path    = require('path');
let express = require('express');
const archivoRutas = require('./rutasImagenesYVideos.js');
let router  = express.Router();

router.get("/",function(req,res){
  res.send("We are live");
  console.log(req.path);
  console.log("Recibida peticion de todo media");
});
router.get("/:id/evento.mp4",function(req,res){

  //console.log(req.path);
  //console.log("Recibida peticion de id:"+req.params.id);
  const ruta = archivoRutas.rutaVideos+req.params.id+'/evento.mp4';
  const stat = fs.statSync(ruta);
  const fileSize = stat.size;
  const range = req.headers.range

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-")
    const start = parseInt(parts[0], 10)
    const end = parts[1]
      ? parseInt(parts[1], 10)
      : fileSize-1

    if(start >= fileSize) {
      res.status(416).send('Requested range not satisfiable\n'+start+' >= '+fileSize);
      return
    }

    const chunksize = (end-start)+1
    const file = fs.createReadStream(ruta, {start, end})
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    }

    res.writeHead(206, head)
    file.pipe(res)
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    }
    res.writeHead(200, head)
    fs.createReadStream(ruta).pipe(res)
  }


  //console.log("OK");
});



module.exports = router;
