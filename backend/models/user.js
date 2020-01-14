const mysql = require('mysql');

const config = require('config');
var User = function ({email: email, password: pwd}) {
  this.email = email;
  this.password = pwd;
  return User;
};
User.save = function(email, password) {
  console.log('This email:'+email);
  console.log('This pwd:'+password);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'insert into videos1.user (email,password) values (\'' + email + '\',\'' + password + '\');';
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
        con.close();
        resolve(result);
      });
    });
  });
};
User.get1 = function(email) {
  console.log('This email:'+email.email);
  return new Promise(async function (resolve, reject){
    const con = mysql.createConnection({
      host: config.get('ConexionBasededatos.host'),
      port: config.get('ConexionBasededatos.port'),
      user: config.get('ConexionBasededatos.user'),
      password: config.get('ConexionBasededatos.password')
    });
    let sql = 'select email, password from videos1.user where email = \'' + email.email + '\';';
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
        console.log(result[0]);
        con.close();
        resolve(result[0]);
      });
    });
  });
};
module.exports = User;
