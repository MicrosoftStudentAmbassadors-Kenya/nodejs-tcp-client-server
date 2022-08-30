const net = require("net");
const client = new net.Socket();
const port = 6969;
const host = "127.0.0.1";

client.connect(port, host, function () {
  console.log("Connected");
  client.write(
    "Hello From Client " +
      client.address().address +
      ":" +
      client.address().port
  );

  client.on("data", function (data) {
    console.log("Server Says : " + "'" + data + "'" + "\n");

    console.log("Send another message to the server: ");

    // Send data to the server from the console
    process.stdin.on("data", function (data) {
      client.write(data);
    });
  });

  client.on("close", function () {
    console.log("Connection closed");
  });
});
