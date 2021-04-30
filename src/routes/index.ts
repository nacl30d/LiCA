import { Router, Request, Response } from 'express';

const indexRouter: Router = Router();

/* GET home page. */
indexRouter.get(
  '/version',
  (req: Request, res: Response): Response => {
    return res.status(200).json({
      version: process.env.npm_package_version,
    });
  }
);

export default indexRouter;
