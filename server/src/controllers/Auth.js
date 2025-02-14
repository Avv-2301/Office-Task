const User = require("../models/User");
const Constant = require("../services/Constant");
const bcrypt = require("bcryptjs");
const { issueToken } = require("../services/Userjwt");

const {
  userSignUpValidation,
  loginValidation,
  logoutValidation,
} = require("../services/UserValidation");

module.exports = {
  /**
   * @description This function is used to sign-up user and manager
   * @param req
   * @param res
   */
  signUp: async (req, res) => {
    try {
      const { requestParams } = req.body;
      console.log(requestParams, "SIGN-UP PARAMS");

      if (
        !requestParams?.name ||
        !requestParams?.email ||
        !requestParams?.password ||
        !requestParams?.accountType ||
        !requestParams?.confirmPassword
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

  /**
   * @description "This function is for user login"
   * @param req
   * @param res
   */

  login: async (req, res) => {
    try {
      const { requestParams } = req.body;
      // console.log(requestParams, "LOGIN");

      if (!requestParams.email || !requestParams.password) {
        return res.status(Constant.FAIL).json({
          sucess: false,
          message: "All Fields Required",
        });
      }

      loginValidation(requestParams, res, async (validate) => {
        if (validate) {
          const user = await User.findOne({
            email: requestParams?.email,
          });
          // console.log(user, "USERDATA");

          if (
            user &&
            (user.role === Constant.ROLE.USER ||
              user.role === Constant.ROLE.MANAGER)
          ) {
            if (user && user.verified !== null) {
              if (user && user?.status === Constant.ACTIVE) {
                const comparePassword = await bcrypt.compare(
                  requestParams.password,
                  user.password
                );
                if (comparePassword) {
                  const userExpTime =
                    Math.floor(Date.now() / 1000) + 5 * 24 * 3600;

                  const payload = {
                    id: user?._id,
                    role: user?.role,
                    expiry: userExpTime,
                  };

                  const token = issueToken(payload);
                  // console.log(token, "GETTING TOKEN");

                  await user.updateOne(
                    { _id: user?._id },
                    {
                      $set: {
                        last_login: new Date(),
                        token,
                        tokenExpiresAt: userExpTime,
                      },
                    },
                    { new: true }
                  );

                  return res.status(Constant.SUCCESS).json({
                    success: true,
                    user,
                    message: "Login successfull",
                  });
                } else {
                  return res.status(Constant.UNAUTHORIZED).json({
                    success: false,
                    message: "Password is incorrect",
                  });
                }
              } else {
                return res.status(Constant.FAIL).json({
                  success: false,
                  message: "Account is Inactive",
                });
              }
            } else {
              return res.status(Constant.FAIL).json({
                success: false,
                message: "User not verified",
              });
            }
          } else {
            return res.status(Constant.FAIL).json({
              success: false,
              message: "User Not Found",
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

  /**
   * @description "This function is for user logout"
   * @param req
   * @param res
   */

  logout: async (req, res) => {
    try {
      const { userId } = req.query;
      console.log(userId, "LOGOUT");
      logoutValidation(userId, res, async (validate) => {
        if (validate) {
          await User.updateOne(
            {
              _id: userId,
            },
            {
              $set: {
                token: null,
                tokenExpiresAt: null,
              },
            }
          );
          return res.status(Constant.SUCCESS).json({
            success: false,
            message: "Logout Successfull",
          });
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
