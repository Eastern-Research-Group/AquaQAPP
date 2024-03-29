const Promise = require('bluebird');
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'));

function hashPassword(user) {
  const SALT_FACTOR = 8;

  if (!user.changed('password')) {
    return false;
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then((salt) => bcrypt.hashAsync(user.password, salt, null))
    .then((hash) => {
      user.setDataValue('password', hash);
    });
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      resetPasswordToken: DataTypes.STRING,
      resetPasswordExpires: DataTypes.STRING,
      organization: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate: hashPassword,
        beforeUpdate: hashPassword,
      },
    }
  );

  User.prototype.comparePassword = function bcrpytCompare(password) {
    return bcrypt.compareAsync(password, this.password);
  };

  User.prototype.hashPassword = function hashUserPassword(user) {
    const SALT_FACTOR = 8;
    return bcrypt
      .genSaltAsync(SALT_FACTOR)
      .then((salt) => bcrypt.hashAsync(user.password, salt, null))
      .then((hash) => {
        user.setDataValue('password', hash);
      });
  };

  /* associations defined here
  User.associate = (models) => {

  }; */

  return User;
};
