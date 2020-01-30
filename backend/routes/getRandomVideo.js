const express = require("express");
const router = express.Router();
const mysql = require('mysql');
const config = require('config');

router.get("",function(req,res){
  getRandomId().then(id =>{
    console.log(id);
    res.send(""+id);
  });
});
function getRandomId(){
  return new Promise(function (resolve, reject) {
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'SELECT * FROM videos1.videos where aprobado = 0 and contra <= ' + config.get('Umbral.votos') + ' order by rand() limit 1;';
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
        resolve(result[0].id_video);
      });
    });
  });
}
module.exports = router;
