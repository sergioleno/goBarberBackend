import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

//middleware upload single: arquivo unico, file nome do arquivo
routes.post('/files', upload.single('file'), (req, res) => {
  return res.json({ ok: true });
});

routes.use(authMiddleware); // todas as rotas abaixo utilizarão o middleware
routes.put('/users', UserController.update);

export default routes;
