export type IUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  createdAt: number;
  updatedAt: number;
};

export type IAuthUser = {
  email: string;
  id: number;
  iat: number;
  exp: number;
};
