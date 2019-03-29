// @ts-nocheck
// Socket initailizing , Client Connect to Server throw the Socket using IP address// 
const socket = io.connect('http://192.168.43.153:3000');
//Buttons initailization on variable//
var mess = document.getElementById('start');//Start Streaming button//
var sock = document.getElementById('socket');// Button  for Closing Socket and  stoping live Streaming// 
var right = document.getElementById('right');//Button for moving right//
var left = document.getElementById('left');//Button for moving Left//
var forward = document.getElementById('forward');//Button For moving forward//
var backward = document.getElementById('backward');//Button for moving Backward//
var capture = document.getElementById('capture');//Button for image Capturing//
// Client Side Listening the messages //

    //Server sending the Live Video to Client//
    socket.on('image', (image) => {    
        const imageele = document.getElementById('image');
        imageele.src = `data:image/jpeg;base64,${image}`;
        });

    //Server sending Right command response to Client//
    socket.on('right', (data) => {
       console.log(data);
    });

    //Server sending Close command response to Client//
    socket.on('open', function(data){
    console.log(data);
     });

    //Server sending data//
    socket.on('chat', function(data){
        console.log(data);
     });
    
    //Server sending the response of Left command to Client//
     socket.on('left', function(data){
        console.log(data);
     });

    //Server sending the response of forward command to Client//
     socket.on('forward', function(data){
        console.log(data);
     });

    //Server sending the response of backward command to Client//
     socket.on('backward', function(data){
        console.log(data);
     });
    //Server Sending the response of Capture image to Client//
    socket.on('capture', function(data){
       console.log(data)
    })

//// Client Sending Commands to Server to do Specific Tasks ///// 

//Start Live Streaming // 
mess.addEventListener('click', function(){
     socket.emit('chat', {
         message : 'yes',
     })
});

//Stop Socket //
sock.addEventListener('click', function(){
   socket.emit('open', {
       message : 'close',
   })
});

//Move Right //
right.addEventListener('click', function(){
    socket.emit('right', {
        message: 'right',
    });
});

//Move Left//
left.addEventListener('click', function(){
    socket.emit('left', {
        message: 'left',
    });
});

//Move Forward//
forward.addEventListener('click', function(){
    socket.emit('forward', {
        message: 'forward',
    });
});

//Move Backward//
backward.addEventListener('click', function(){
    socket.emit('backward', {
        message: 'backward',
    });
});

//Capture Image Command//
capture.addEventListener('click', function(){
    socket.emit('capture', {
        message: 'capture',
    });
});


