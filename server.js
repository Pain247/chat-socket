var express = require('express');
var app = express();
var http = require('http').Server(app);
http.listen(process.env.PORT||8080);
var routes = require('./app/routes/index.js');
var io = require('socket.io')(http);
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : '6c704716-6ebc-4d82-a382-a72000f9d811.mysql.sequelizer.com',
  user     : 'zfdodilksacomvmw',
  password : 'JmJ5cWyk8HVaPK36MGCzHs4uqUfDqAoePX6FbqNgW6JGGzRfgi45wcrqqpNpQ33F',
  database : 'db6c7047166ebc4d82a382a72000f9d811'

});
connection.query("ALTER TABLE messages ALTER COLUMN message nvarchar");
io.on('connection', function(socket){
  console.log(socket.id);
  console.log("we are connected");
  socket.on("new-join", function(msg){
    console.log(msg);
    connection.query("select userid from users where username='"+msg+"'", function(err, results, fields){
      console.log(results);
      if(results===undefined||results.length===0){
        connection.query("insert into users(username) value(N'"+msg+"')");
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
        connection.query("insert into messages value('"+results[0].userid+"',N'"+msg.message+"',now())");
        io.emit("receive-message",msg);
      }
    });
  });
});
app.use('/controllers',express.static(process.cwd()+'/app/controllers'));
app.use('/public',express.static(process.cwd()+'/public'));
routes(app);
