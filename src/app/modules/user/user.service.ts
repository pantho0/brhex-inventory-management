import status from 'http-status';
import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.isUserExist(payload.email);
  if (isUserExist) {
    throw new AppError(status.BAD_REQUEST, 'User already exists');
  }
  const user = await User.create(payload);
  return user;
};

const getAllUserFromDB = async () => {
  const users = await User.find();
  return users;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id);
  return result;
};

const getMeFromDB = async (id: string) => {
  const user = await User.findById(id);
  return user;
};

const changeUserRoleIntoDB = async (payload: { id: string; role: string }) => {
  const user = await User.findByIdAndUpdate(
    payload.id,
    {
      $set: {
        role: payload.role,
      },
    },
    { new: true },
  );

  return user;
};

const blockUserIntoDB = async (payload: { id: string }) => {
  const user = await User.findByIdAndUpdate(
    payload.id,
    [
      {
        $set: {
          isBlocked: { $not: '$isBlocked' },
        },
      },
    ],
    { new: true },
  );

  return user;
};

const deleteUserIntoDB = async (payload: { id: string }) => {
  const user = await User.findByIdAndUpdate(
    payload.id,
    [
      {
        $set: {
          isDeleted: { $not: '$isDeleted' },
        },
      },
    ],
    { new: true },
  );

  return user;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  getMeFromDB,
  changeUserRoleIntoDB,
  blockUserIntoDB,
  deleteUserIntoDB,
};
