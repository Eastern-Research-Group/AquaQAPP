module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.DB_NAME || 'qapp',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'password',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || '5432',
    },
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret',
  },
  emailApiKey: process.env.SENDGRID_API_KEY || '',
  emailHost: process.env.MAILGUN_SMTP_SERVER || 'smtp.mailgun.org',
  emailPort: process.env.MAILGUN_SMTP_PORT || 587,
  emailUser: process.env.MAILGUN_SMTP_LOGIN || 'aqua.qapp@gmail.com',
  emailPassword: process.env.MAILGUN_SMTP_PASSWORD || 'password',
  baseUrl: process.env.BASE_URL || 'http://localhost:8080',
};
