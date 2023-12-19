import { User } from "../../../entities/User";
import UserModel from "../../../models/UserModel";
import { logger } from "../../../services/logging/winston";
import { IUserRepository } from "../../IUserRepository";

export class UserMySql implements IUserRepository {
  async createUser(user: User): Promise<User> {
    logger.info(user);
    const createUserResponse = await UserModel.create({
      email: user.email,
      name: user.name,
      password: user.password,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    user.id = createUserResponse.dataValues.id;
    return user;
  }
  async findUserByEmail(email: string): Promise<User | undefined> {
    logger.info(`Search for user with email: ${email}`);
    const findUserResponse = await UserModel.findOne({
      where: {
        email: email,
      },
    });
    if (findUserResponse?.dataValues) {
      const user = new User(findUserResponse.dataValues);
      return user;
    }
    return undefined;
  }
}
