'use strict';
var path = process.cwd();
var body = require('body-parser');
var urlencoded = body.urlencoded({extended :false});
var mysql      = require('mysql');
var connection = mysql.createConnection("mysql://zfdodilksacomvmw:JmJ5cWyk8HVaPK36MGCzHs4uqUfDqAoePX6FbqNgW6JGGzRfgi45wcrqqpNpQ33F@6c704716-6ebc-4d82-a382-a72000f9d811.mysql.sequelizer.com/db6c7047166ebc4d82a382a72000f9d811");
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
