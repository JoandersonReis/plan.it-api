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
  SESSION: {
    EXPIRES_TIMESTAMP: 7 * 24 * 60 * 60 * 1000, // 7 days
  },
  NODEMAILER: {
    TRANSPORTER_OPTIONS: {
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    },
  },
};
