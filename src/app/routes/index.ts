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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
