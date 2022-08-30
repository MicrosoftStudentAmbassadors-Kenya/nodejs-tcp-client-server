const net = require("net");

const HOST = "127.0.0.1";
const PORT = 6969;

// Create a TCP/IPC server instance, and chain the listen function to it
// net

const server = net.createServer();

server.listen(PORT, HOST, () => {
  console.log("TCP Server listening on " + HOST + ":" + PORT);
});

const sockets = [];

server.on("connection", function (socket) {
  console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);

  sockets.push(socket);

  // Loop through all sockets and write them to one console.table()

  sockets.forEach(function (socket) {
    console.table({
      "Connected Clients": socket.remoteAddress + ":" + socket.remotePort,
    });
  });

  socket.on("data", function (data) {
    console.log(
      "DATA " +
        socket.remoteAddress +
        ":" +
        socket.remotePort +
        ": " +
        data +
        "\n"
    );
    sockets.forEach(function (s) {
      s.write(s.remoteAddress + ":" + s.remotePort + " sent: " + data);
    });
  });

  // Add a 'close' event handler to this instance of socket
  socket.on("close", function (data) {
    console.log("CLOSED: " + socket.remoteAddress + ":" + socket.remotePort);
    let index = sockets.findIndex(function (o) {
      return (
        o.remoteAddress === socket.remoteAddress &&
        o.remotePort === socket.remotePort
      );
    });
    if (index !== -1) sockets.splice(index, 1);
  });

  socket.on("error", function (err) {
    console.log("ERROR: " + err.message);
  });

  socket.on("end", function () {
    console.log("ENDED SESSION");
  });
});

// net
//   .createServer(function (socket) {
//     // When a client connects, we note it in the console
//     console.log("CONNECTED: " + socket.remoteAddress + ":" + socket.remotePort);
//     socket.write("Welcome to the server!\n");
//     socket.write("To quit the server type 'quit/kill'\n");
//     socket.write("Please enter your message: ");

//     socket.setEncoding("utf8");
//     socket
//       // When the client sends data, we print it in the console
//       .on("data", function (data) {
//         if (
//           data.toString().toLowerCase() === "quit" ||
//           data.toString().toLowerCase() === "kill"
//         ) {
//           socket.end();
//         }

//         console.log("DATA RECEIVED: " + data + "\n");

//         socket.write("You sent: " + data + "\n");
//         socket.write("Please enter your message: \n");
//       })
//       .on("end", function () {
//         console.log(
//           "CLOSED: " + socket.remoteAddress + " " + socket.remotePort
//         );
//       })
//       .on("error", function (err) {
//         console.log("ERROR: " + err);
//       })
//       .on("close", function () {
//         console.log(
//           "CLOSED: " + socket.remoteAddress + " " + socket.remotePort
//         );
//       })
//       .on("drain", function () {
//         console.log("DRAIN: " + socket.remoteAddress + " " + socket.remotePort);
//       })
//       .on("timeout", function () {
//         setTimeout(10000, function () {
//           console.log(
//             "TIMEOUT: " + socket.remoteAddress + " " + socket.remotePort
//           );
//           socket.end();
//         });
//       })
//       .on("end", function () {
//         console.log("END: " + socket.remoteAddress + " " + socket.remotePort);
//       });
//   })
//   .listen(PORT, HOST, () => {
//     console.log("TCP Server listening on " + HOST + ":" + PORT);
//   });
