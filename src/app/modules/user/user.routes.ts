import { NextFunction, Request, Response, Router } from 'express';
import * as controller from './user.controller';
import { fileUploder } from '@/app/helper';
import * as validation from '@/app/modules/user/user.validation';
import { auth } from '@/app/middlewares';
import { UserRole } from '@prisma/client';

const router = Router();

router.get('/', auth(UserRole.ADMIN), controller.getAllFormDB);

router.post(
  '/create-patient',
  fileUploder.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = validation.createPatientValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return controller.createPatient(req, res, next);
  }
);
router.post(
  '/create-admin',
  auth(UserRole.ADMIN),
  fileUploder.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = validation.createAdminValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return controller.createAdmin(req, res, next);
  }
);

router.use(
  '/create-doctor',
  auth(UserRole.DOCTOR),
  fileUploder.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = validation.createDoctorValidationSchema.parse(
      JSON.parse(req.body.data)
    );
    return controller.createDoctor(req, res, next);
  }
);
export default router;
