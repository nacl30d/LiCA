import { Router, Request, Response } from 'express';
import logger from '../libs/winston';

const indexRouter: Router = Router();

/* GET home page. */
indexRouter.get(
  '/version',
  (req: Request, res: Response): Response => {
    logger.debug('Called /api/version', {
      remote_ip: req.connection.remoteAddress,
    });
    return res.status(200).json({
      version: process.env.npm_package_version,
    });
  }
);

export default indexRouter;
