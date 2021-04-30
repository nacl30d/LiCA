import { Router, Request, Response, NextFunction } from 'express';

const indexRouter: Router = Router();

/* GET home page. */
indexRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction): Response => {
    return res.status(200).json({
      message: 'Hello world!',
    });
  }
);

export default indexRouter;
