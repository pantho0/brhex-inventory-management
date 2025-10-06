import { Router } from 'express';
import { UserControllers } from './user.controller';

const router = Router();

router.get('/', UserControllers.getAllUser);
router.get('/:id', UserControllers.getSingleUser);
router.get('/me', UserControllers.getMe);
router.post(
  '/create-user',

  UserControllers.createUser,
);
router.put(
  '/change-role',

  UserControllers.changeUserRole,
);
router.put('/block-user', UserControllers.blockUser);
router.put('/delete-user', UserControllers.deleteUser);

export const UserRoutes = router;
