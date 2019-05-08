const Joi = require('joi');

module.exports = {
  register(req, res, next) {
    const schema = {
      email: Joi.string().email(),
      password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      confirmPassword: Joi.any().valid(Joi.ref('password')),
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address',
          });
          break;
        case 'password':
          res.status(400).send({
            error: `Password must be at least 8 characters in length.
                    Password must contain at least one lower-case and upper-case character, and one number.`,
          });
          break;
        case 'confirmPassword':
          res.status(400).send({
            error: 'Your password and confirmation password do not match.',
          });
          break;
        default:
          res.status(400).send({
            error: 'Invalid registration information',
          });
      }
    } else {
      next();
    }
  },
  reset(req, res, next) {
    const schema = {
      newPassword: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{8,32}$')),
      confirmNewPassword: Joi.any().valid(Joi.ref('newPassword')),
      resetPasswordToken: Joi.any(),
    };

    const { error } = Joi.validate(req.body, schema);
    if (error) {
      switch (error.details[0].context.key) {
        case 'newPassword':
          res.status(400).send({
            error: `Password must be at least 8 characters in length.
                    Password must contain at least one lower-case and upper-case character, and one number.`,
          });
          break;
        case 'confirmNewPassword':
          res.status(400).send({
            error: 'Your password and confirmation password do not match.',
          });
          break;
        default:
          res.status(400).send({
            error: `There was an error with your request. Please try again. ${error}`,
          });
      }
    } else {
      next();
    }
  },
};
