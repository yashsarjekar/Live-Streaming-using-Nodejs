// @ts-nocheck
const express = require('express');//Used Express 
const cv = require('opencv4nodejs');//Using Opencv
const path = require('path');
const fs = require('fs');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);//Socket

app.get('/', (req ,res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
});
//Socket Connection
io.on('connection', function(socket){
   console.log('made a socket connection', socket.id);
   const cwap = new cv.VideoCapture(1);
   //Listening Client forward Command//
   socket.on('forward', function(data){
      console.log(data.message);
      if(data.message == 'forward'){
         //Giving response to Client of forward command//
         io.sockets.emit('forward', 'yes i am moving forward');
      }
   });
   //Listening Client backward Command//
   socket.on('backward', function(data){
      console.log(data.message);
      if(data.message == 'backward'){
         //Giving response to Client of backward command//
         io.sockets.emit('backward', 'yes i am moving backward');
      }
   });
   //Listening Client right Command//
   socket.on('right', function(data){
      console.log(data.message);
      if(data.message == 'right'){
         //Giving response to Client of right command//
         io.sockets.emit('right', 'yes i am moving right');
      }
   });
   //Listening Client left Command//
   socket.on('left', function(data){
      console.log(data.message);
      if(data.message == 'left'){
         //Giving response to Client of left command//
         io.sockets.emit('left', 'yes i am moving Left');
      }
   });
   //Listening Client Start Streaming Command//
   socket.on('chat', function(data){
      if(data.message == 'yes'){
         //Giving response to Client of Start Streaming command//
         setInterval(() => {
           try{ 
               
               const frame = cwap.read();
               const image = cv.imencode('.jpeg', frame).toString('base64');
               io.sockets.emit('image', image);
               
            }catch (BaseImageEncoder){
                 io.sockets.emit('image', 'some data');
            }      
         }, 100);
      }
   });
   //Listening Client Close Command//
   socket.on('open', function(data){
      io.sockets.emit('open', data);
      if(data.message == 'close'){
         if(cv.isOpened()){
         //Giving response to Client of Close Socket command//
         io.close();
       }
      }
   });

   //Listening Client Capture Command//
   socket.on('capture', function(data){
     const frame = cwap.read();
     const image = cv.imencode('.jpeg', frame).toString('base64');
     io.sockets.emit('capture', 'image Capture');
     let base64Image = image.split(';base64,').pop();
     let name = 'uploads/IMG-' + Date.now() + '.jpg';
     fs.writeFile(name,base64Image, { encoding: 'base64'}, function(err){
      console.log('file Created');
      });
   });
});
server.listen(3000, () => {
   console.log('Running on port 3000');
});