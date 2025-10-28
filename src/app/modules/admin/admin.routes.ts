import { auth, validateRequest } from '@/app/middlewares';
import { UserRole } from '@prisma/client';
import { Router } from 'express';
import * as controller from './admin.controller';
import * as validation from './admin.validation';

const router = Router();

router.get('/', auth(UserRole.ADMIN), controller.getAllFromDB);

router.get('/:id', auth(UserRole.ADMIN), controller.getByIdFromDB);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(validation.update),
  controller.updateIntoDB
);

router.delete('/:id', auth(UserRole.ADMIN), controller.deleteFromDB);

router.delete('/soft/:id', auth(UserRole.ADMIN), controller.softDeleteFromDB);

export default router;
