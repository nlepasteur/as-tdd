// types
import type { User as FormattedUser } from '@api';
// model
import User from '../models/User';

type RequiredData = Pick<FormattedUser, 'name' | 'email' | 'password'>;

const createUser = (model: typeof User) => (payload: RequiredData) => {
  const user = new model(payload);
  return user.save();
};

export default (model: typeof User) => ({
  createUser: createUser(model),
});
