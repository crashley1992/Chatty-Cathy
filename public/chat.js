///Make connection
const socket = io.connect('http://localhost:4000');

//query dom 
let message = document.getElementById('message');
let handle = document.getElementById('handle');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let feedback = document.getElementById('feedback');

//emiit events 
btn.addEventListener('click', () => {
    socket.emit('chat', {
        //grabs whats in message box
        message: message.value, 
        //grabs whats in handle box
        handle: handle.value
    });
});
//adds event listen to message for broadcast the a person is typing
message.addEventListener('keypress', () => {
    socket.emit('typing', handle.value);
});

//listen for events
socket.on('chat', (data) => {
    //this prevents the window from looking like someone is still typing even after message has been sent
    feedback.innerHTML = '';
    //this outputs the message with user name
    output.innerHTML += `<p><strong> ${data.handle}: </strong> ${data.message} </p>`;
});

socket.on('typing', (data) => {
    feedback.innerHTML = `<p><em> ${data} is typing a message..</em></p>`;
});