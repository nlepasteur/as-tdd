import userService from '../../src/services/user.service';

describe('userService', () => {
  describe('createUser', () => {
    it('passes "name" "email" and "password" as arguments', () => {
      let args: any;
      const stubBody = { name: 'user', email: 'email', password: 'password' };
      const MockedModel = function (this: any, payload: any) {
        this.save = () => (args = payload);
      } as any;
      userService(MockedModel).createUser(stubBody);
      expect(args).toEqual(stubBody);
    });
  });
});
