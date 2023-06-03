import config from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';

async function createUser(user: IUser): Promise<IUser | null> {
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new Error('Failed to create user!');
  }
  return createdUser;
}

export default { createUser };
