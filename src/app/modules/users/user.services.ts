import config from '../../../config';
import { IUser } from './user.interface';
import User from './user.model';
import { generateUserId } from './user.utils';

async function createUser(user: IUser): Promise<IUser | null> {
  user.id = await generateUserId();

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
