import { Router } from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { USER_ROLE } from './user.const';
import auth from '../../middlewares/auth';

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);
router.get('/:id', auth(USER_ROLE.admin), UserControllers.getSingleUser);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.post(
  '/create-user',
  validateRequest(createUserValidationSchema),
  UserControllers.createUser,
);
router.put(
  '/change-role',
  auth(USER_ROLE.admin),
  UserControllers.changeUserRole,
);
router.put('/block-user', auth(USER_ROLE.admin), UserControllers.blockUser);
router.put('/delete-user', auth(USER_ROLE.admin), UserControllers.deleteUser);

export const UserRoutes = router;
