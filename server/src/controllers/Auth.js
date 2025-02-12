const User = require("../models/User");
const Constant = require("../services/Constant");
const bcrypt = require("bcryptjs");

const {
  userSignUpValidation,
  loginValidation,
} = require("../services/UserValidation");

module.exports = {
  /**
   * @description This function is used to sign-up user and manager
   * @param req
   * @param res
   */
  signUp: async (req, res) => {
    try {
      const requestParams = req.body;
      console.log(requestParams, "SIGN-UP PARAMS");

      if (
        !requestParams.name ||
        !requestParams.email ||
        !requestParams.password ||
        !requestParams.confirmPassword
      ) {
        return res.status(Constant.FAIL).json({
          success: false,
          message: "All fields are required",
        });
      }

      userSignUpValidation(requestParams, res, async (validate) => {
        if (validate) {
          if (requestParams.password !== requestParams.confirmPassword) {
            return Response.errorResponseData(
              res,
              res.__("PASSWORD_AND_CONFIRM_PASSWORD_NOT_MATCHED"),
              Constant.UNAUTHORIZED
            );
          }
          const user = await User.findOne(
            { email: requestParams.email },
            {
              email: 1,
              verified: 1,
            }
          );
          console.log(user, "USERDATA");

          if (user && user?.verified !== null) {
            return Response.successResponseWithoutData(
              res,
              res.__("user is already sign-up"),
              Constant.FAIL
            );
          } else {
            const Hash_Password = await bcrypt.hash(requestParams.password, 10);

            let user_obj = {
              name: requestParams.name,
              email: requestParams.email,
              password: Hash_Password,
              verified: true,
              status: Constant.ACTIVE,
              role: requestParams.accountType,
            };
            const response = await User.create(user_obj);

            return res.status(Constant.SUCCESS).json({
              success: true,
              response,
              message: "Sign-Up Successfull",
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(Constant.INTERNAL_SERVER).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
