import { IUser } from "../utils/types/IUserType";

export class User {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public createdAt!: number;
  public updatedAt!: number;
  constructor(props: IUser, id?: number) {
    console.log(props);
    Object.assign(this, props);
    if (id) {
      this.id = id;
    }
  }
}
