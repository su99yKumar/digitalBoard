const express = require("express"); //acess
const socket = require("socket.io");

const app = express(); //intilized and server ready

app.use(express.static("public"))

let port = 3000;
let server = app.listen(port, () => {
    console.log("listening to port " + port);
});

let io=socket(server);
io.on("connection", (socket)=>{
    console.log("Made socket connection");
});
