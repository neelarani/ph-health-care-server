import express from 'express';
import * as modules from '@/app/modules';

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
    path: '/doctor-schedule',
    route: modules.DoctorScheduleRoutes,
  },
  {
    path: '/specialties',
    route: modules.SpecialtiesRoutes,
  },
  {
    path: '/doctor',
    route: modules.DoctorRoutes,
  },
  {
    path: '/admin',
    route: modules.AdminRoutes,
  },
  {
    path: '/patient',
    route: modules.PatientRoutes,
  },
  {
    path: '/appointment',
    route: modules.AppointmentRoutes,
  },
  {
    path: '/prescription',
    route: modules.PrescriptionRoutes,
  },
  {
    path: '/review',
    route: modules.ReviewRoutes,
  },
  {
    path: '/metadata',
    route: modules.MetaRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
