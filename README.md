# Node TCP/IPC Server.

- This is a simple script, that uses the net lib, to create a TCP server. You can be able to plug in, send and listen to the server:

- After cloning and navigating into the repository folder run:

```sh
    # Install dependencies
    npm i #pm2

    # To start the TCP server run
    npm start

    # To check server status run
    netstat -an | grep 6969

    # To send requests to the server run
    telnet localhost 6969
```
- Its worth noting there is an inbuilt client
- Next to use this project as the TCP server and send requests to other users.

Happy Hacking!