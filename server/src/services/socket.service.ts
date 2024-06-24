import { Server } from 'socket.io';

class SocketService {
  private _io: Server;
  constructor() {
    console.log('Initialize socket service...');
    this._io = new Server();
  }

  public initListeners() {
    const io = this._io;

    console.log('Init socket listeners...');

    io.on('connect', (socket) => {
      console.log('Socket connected: ', socket.id);

      socket.on('event:message', (message: string) => {
        console.log('New Message Recv: ', message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
