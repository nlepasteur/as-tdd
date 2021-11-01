// model
import User from '../models/user-model';

const createUser =
  (model: typeof User) =>
  (required: { username: string; email: string; password: string }) => {
    console.log('required: ', required);
    const user = new model(required);
    return user.save();
  };

const findOne = (model: typeof User) => (required: { user_id: string }) => {
  const user = model.findOne(required);
  return user;
};

const findUserByUsername =
  (model: typeof User) => (required: { username: string }) => {
    const user = model.findOne(required);
    return user;
  };

export default (model: typeof User) => ({
  createUser: createUser(model),
  findOne: findOne(model),
  findUserByUsername: findUserByUsername(model),
});
