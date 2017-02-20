var express = require('express');
var app = express();
var http = require('http').Server(app);
http.listen(process.env.PORT||8080);
var routes = require('./app/routes/index.js');
var io = require('socket.io')(http);
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  port : 3306,
  user     : 'root',
  password : '0304',
  database : 'chat-socket'
});

io.on('connection', function(socket){
  console.log(socket.id);
  console.log("we are connected");
  socket.on("new-join", function(msg){
    console.log(msg);
    connection.query("select userid from users where username='"+msg+"'", function(err, results, fields){
      console.log(results);
      if(results===undefined||results.length===0){
        connection.query("insert into users(username) value('"+msg+"')");
      }
    });
    io.emit("receive-join",msg);
  });
  socket.on("new-message",function(msg){
    console.log(msg);
    connection.query("select userid from users where username='"+msg.username+"'",function(err,results,fields){
      if(results===undefined||results.length===0){
         console.log("Wrong user!");
      }
      else{
        connection.query("insert into messages value('"+results[0].userid+"','"+msg.message+"',now())");
        io.emit("receive-message",msg);
      }
    });
  });
});
app.use('/controllers',express.static(process.cwd()+'/app/controllers'));
app.use('/public',express.static(process.cwd()+'/public'));
routes(app);
