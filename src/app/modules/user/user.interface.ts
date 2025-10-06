import { Model, Types } from 'mongoose';
import { USER_ROLE } from './user.const';

export type TUser = {
  _id?: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
  passwordChagedAt?: Date;
  isDeleted?: boolean;
};

export interface UserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser | null>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
