import { IUser } from './user.interface';
import User from './user.model';

export async function generateUserId(): Promise<string> {
  const lastUser = (await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()) as IUser;

  let newId;

  if (lastUser.id) {
    newId = (parseInt(lastUser.id) + 1).toString().padStart(5, '0');
  } else {
    newId = (1).toString().padStart(5, '0');
  }
  return newId;
}
