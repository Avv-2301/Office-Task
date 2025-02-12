const Joi = require("joi");
const Constant = require("../services/Constant");

module.exports = {
  /**
   * @description This function is used to validate the user Signup function
   * @param req
   * @param res
   */
  userSignUpValidation: (req, res, callback) => {
    const schema = Joi.object({
      name: Joi.string().trim().required(),
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().min(8).required(),
      confirmPassword: Joi.string().trim().min(8).required(),
    });
    const { error } = schema.validate(req);
    if (error) {
      return res.status(Constant.NOT_ACCEPTABLE).json({
        success: false,
        message: "Validation Failed",
      });
    }
    return callback(true);
  },

  /**
   * @description This function is to validate the fields for login function
   * @param req
   * @param res
   */
  loginValidation: (req, res, callback) => {
    const schema = Joi.object({
      email: Joi.string().email().trim().required(),
      password: Joi.string().trim().min(8).required(),
    });

    const { error } = schema.validate(req);
    if (error) {
      return res.status(Constant.NOT_ACCEPTABLE).json({
        success: false,
        message: "Validation Failed",
      });
    }
    return callback(true);
  },
};
