import { Server } from 'socket.io';
import Redis, { RedisOptions } from 'ioredis';

const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST as string,
  port: parseInt(process.env.REDIS_PORT as string, 10),
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
};

const pub = new Redis(redisOptions);
const sub = new Redis(redisOptions);

class SocketService {
  private _io: Server;
  constructor() {
    console.log('Initialize socket service...');
    this._io = new Server({
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });

    sub.subscribe('MESSAGES');
  }

  public initListeners() {
    const io = this._io;

    console.log('Init socket listeners...');

    io.on('connect', (socket) => {
      console.log('Socket connected: ', socket.id);

      socket.on('event:message', async ({ message }: { message: string }) => {
        console.log('New Message Recv: ', message);

        // Publish this to redis
        await pub.publish('MESSAGES', JSON.stringify({ message }));
      });
    });

    sub.on('message', (channel, message) => {
      if (channel === 'MESSAGES') {
        io.emit('message', message);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
