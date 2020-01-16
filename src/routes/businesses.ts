import { Router } from 'express';
import Validator from '../middlewares/Validator';

const validator = new Validator();

const createUsersRoute = ({ businessesController }) => {
  const router = Router();

  router.post('/groups', validator.addressValidator, businessesController.getAllBusinessesGroups);
  router.post('/top', businessesController.getTopBusinesses);
  return router;
};

export default createUsersRoute;
