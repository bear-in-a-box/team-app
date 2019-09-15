import { Data } from '@team-app/models';

export interface User {
  createUser(request: Data.User.Create.Request): Promise<Data.User.Create.Response>;
  readUser(request: Data.User.Read.Request): Promise<Data.User.Read.Response>;
  updateUser(request: Data.User.Update.Request): Promise<Data.User.Update.Response>;
  deleteUser(request: Data.User.Delete.Request): Promise<Data.User.Delete.Response>;
}
