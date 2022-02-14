module.exports = {
  env: 'production',

  /**
   * PostgreSQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
//  database: {
//    username: 'postgres',
//    dialect: 'postgres',
//    password: '',
//    database: 'postgres',
//    host: 'postgres',
//    logging: console.log,
//  },

  /**
   * MySQL configuration for Sequelize.
   * More info: https://sequelize.org/v5/manual/getting-started.html#setting-up-a-connection
   */
   database: {
     username: 'admin',
     dialect: 'mysql',
     password: 'HELLO567',
     database: 'MyDB',
     host:
       'database-1.cqcy3l1krymb.us-east-1.rds.amazonaws.com',
     logging: console.log,
   },

  /**
   * Secret used to Sign the JWT (Authentication) tokens.
   */
  authJwtSecret: '<place a generated random value here>',

  /**
   * Directory where uploaded files are saved.
   * Default to the storage volume: /storage.
   * See /docker-compose.yml
   */
  uploadDir: '/storage',

  /**
   * Configuration to allow email sending used on:
   * backend/src/services/shared/email/emailSender.js
   *
   * More info: https://nodemailer.com
   */
  email: {
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  /**
   * Client URL used when sending emails.
   */
  clientUrl: '<insert client url here>',


};
