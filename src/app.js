import express from 'express';
import path from 'path';
import routes from './routes';

import './database';

process.on('SIGINT', () => {
  process.exit();
});
class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
    // passo a rota que servirá os arquivos, bem como o path para a pasta contendo os arquivos
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
