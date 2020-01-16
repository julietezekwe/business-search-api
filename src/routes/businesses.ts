import { Router } from 'express';

const createUsersRoute = ({ businessesController }) => {
  const router = Router();

  router.post('/groups', businessesController.getAllBusinessesGroups);
  router.post('/top', businessesController.getTopBusinesses);
  return router;
};

export default createUsersRoute;
