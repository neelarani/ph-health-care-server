import { NextFunction, Request, Response, Router } from 'express';
import * as controller from './specialties.service';
import * as validation from './specialties.validation';
import { fileUploder } from '@/app/helper';
import { UserRole } from '@prisma/client';
import { auth } from '@/app/middlewares';

const router = Router();

router.get('/', controller.getAllFromDB);

router.post(
  '/',
  fileUploder.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = validation.create.parse(JSON.parse(req.body.data));
    next();
  },
  controller.insertIntoDB
);

router.delete(
  '/:id',
  auth(UserRole.ADMIN, UserRole.ADMIN),
  controller.deleteFromDB
);

export default router;
