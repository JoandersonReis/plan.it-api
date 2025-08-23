export const CONFIG = {
  USER: {
    SECRETS: {
      ACCESS: process.env.JWT_ACCESS_USER_SECRET,
      REFRESH: process.env.JWT_REFRESH_USER_SECRET,
    },
    EXPIRES: {
      ACCESS: '15m',
      REFRESH: '2h',
    },
  },
};
