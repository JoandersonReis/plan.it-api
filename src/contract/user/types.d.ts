export type TUserCreateData = {
  fullname: string;
  email: string;
  password: string;
};

export type TUserDatabase = TUserCreateData & {
  id: string;
  balance: string;
  createdAt: Date;
};
