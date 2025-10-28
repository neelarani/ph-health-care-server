import express from 'express';
import * as modules from '@/app/modules';
import path from 'path';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/user',
    route: modules.UserRoutes,
  },
  {
    path: '/auth',
    route: modules.AuthRoutes,
  },
  {
    path: '/schedule',
    route: modules.ScheduleRoutes,
  },
  {
    path: '/patient',
    route: modules.PatientRoutes,
  },
  {
    path: '/doctor',
    route: modules.DoctorRoutes,
  },
  {
    path: '/schedule',
    route: modules.DoctorScheduleRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
