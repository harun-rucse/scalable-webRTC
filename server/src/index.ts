import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
import SocketService from './services/socket.service';

async function init() {
  const httpServer = http.createServer();
  const PORT = process.env.port || 5000;

  const socketService = new SocketService();
  socketService.io.attach(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`Application running on port ${PORT}...`);
  });

  socketService.initListeners();
}

init();
