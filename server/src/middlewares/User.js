const jwToken = require("../services/userJwt");
const Constant = require("../services/Constant");
const User = require("../models/User");

module.exports = {
  /**
   * @description This function is used to authenticate and authorize a user
   * @param req
   * @param res
   */
  userAuthToken: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(Constant.UNAUTHORIZED).json({
          success: false,
          message: "Authorization error",
        });
      } else {
        const tokenData = await jwToken.decode(token);
        if (tokenData) {
          const decode = await jwToken.verify(tokenData);

          if (decode.id) {
            (req.authUserId = decode.id), (req.role = decode.role);

            const user = await User.findOne(
              {
                _id: req.authUserId,
              },
              { status: 1, token: 1 }
            );
            let user_token = `Bearer ${user.token}`;

            if (user && user_token === token) {
              if (user && user.status === Constant.INACTIVE) {
                return res.status(Constant.FAIL).json({
                  success: false,
                  message: "User account is Inactive",
                });
              }
              if (user && user.status === Constant.ACTIVE) {
                return next();
              } else {
                return res.status(Constant.FAIL).json({
                  success: false,
                  message: "Account is blocked",
                });
              }
            } else {
              return res.status(Constant.FAIL).json({
                success: false,
                message: "Invalid Token 1",
              });
            }
          } else {
            return res.status(Constant.FAIL).json({
              success: false,
              message: "Invalid Token 2",
            });
          }
        } else {
          return res.status(Constant.FAIL).json({
            success: false,
            message: "Invalid Token 3",
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(Constant.INTERNAL_SERVER).json({
        success: false,
        message: "Internal server error",
      });
    }
  },
};
