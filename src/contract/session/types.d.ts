export type TSessionCreateData = {
  id?: string;
  accessToken: string;
  refreshToken: string;
  ip: string;
  userId: string;
  active?: boolean;
};

export type TSessionDatabase = TSessionCreateData & {
  id: string;
  createdAt: Date;
};
