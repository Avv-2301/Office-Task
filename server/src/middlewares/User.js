const jwToken = require("../services/userJwt");
const Response = require("../services/Response");
const Constant = require("../services/Constant");
const User = require("../models/user");

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
        return Response.errorResponseWithoutData(
          res,
          "Authorization error",
          Constant.UNAUTHORIZED
        );
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
                return Response.errorResponseWithoutData(
                  res,
                  "User account is Inactive",
                  Constant.UNAUTHORIZED
                );
              }
              if (user && user.status === Constant.ACTIVE) {
                return next();
              } else {
                return Response.errorResponseWithoutData(
                  res,
                  "Account is blocked",
                  Constant.UNAUTHORIZED
                );
              }
            } else {
              return Response.errorResponseWithoutData(
                res,
                "Invalid token 1",
                Constant.UNAUTHORIZED
              );
            }
          } else {
            return Response.errorResponseWithoutData(
              res,
              "Invalid token 2",
              Constant.UNAUTHORIZED
            );
          }
        } else {
          return Response.errorResponseWithoutData(
            res,
            "Invalid token 3",
            Constant.UNAUTHORIZED
          );
        }
      }
    } catch (error) {
      console.log(error);
      return Response.errorResponseData(
        res,
        "Internal Server error",
        Constant.INTERNAL_SERVER
      );
    }
  },
};
