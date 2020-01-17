import { Router } from 'express';

const createUsersRoute = ({ businessesController, converter, validator }) => {
  const router = Router();

  router.post('/groups', validator.addressValidator, converter.addressToPoints, businessesController.getAllBusinessesGroups);
  
  router.post('/top', validator.addressValidator,  converter.addressToPoints, businessesController.getTopBusinesses);
  return router;
};

export default createUsersRoute;
