export default class User {
  public id: string;
  public login: string;
  public roles: string[];
  public email: string;

  constructor(_id: string, _login: string, _roles: string[], _email: string) {
    this.id = _id;
    this.login = _login;
    this.roles = _roles;
    this.email = _email;
  }
}

export interface UserLoginModel {
  login: string;
  roles: string[];
}

export enum UserRoles {
  user = 'user',
  admin = 'admin',
}
