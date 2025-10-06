import { Router } from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.const';

const router = Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUser);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getMe);
router.post('/create-user', auth(USER_ROLE.admin), UserControllers.createUser);
router.put(
  '/change-role',
  auth(USER_ROLE.admin),
  UserControllers.changeUserRole,
);
router.put('/block-user', auth(USER_ROLE.admin), UserControllers.blockUser);
router.put('/delete-user', auth(USER_ROLE.admin), UserControllers.deleteUser);
router.get(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getSingleUser,
);

export const UserRoutes = router;
