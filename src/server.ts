import app from 'app';
import logger from 'libs/winston';
import http, { Server } from 'http';
import { AddressInfo } from 'net';

/**
 * Get port from environment and store in Express.
 */

const port: string = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */

const server: Server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { syscall = '', code = '' }: { syscall: string; code: string } = error;
  if (syscall !== 'listen') {
    throw error;
  }

  const bind: string = 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const { port } = server.address() as AddressInfo;
  logger.debug(`Listening on port ${port}`);
}
