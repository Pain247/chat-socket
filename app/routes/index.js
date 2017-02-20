'use strict';
var path = process.cwd();
var body = require('body-parser');
var urlencoded = body.urlencoded({extended :false});
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : '0304',
  database : 'chat-socket'
});
var conv = new Object();
var users =new Object();
module.exports= function(app){

  app.get('/',function(req,res){
    res.sendFile(path+'/public/index.html');
  });
  app.get('/conversation',function(req,res){
    connection.query("select u.username, m.message from users as u, messages as m where u.userid = m.userid",function(err,results,field){
      res.send(results);
    });
    });

  }
