const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports.issueToken = (payload) => {
  return jwt.sign(
    {
      id: payload.id,
      role: payload.role,
      expiry: payload.expiry,
    },
    process.env.JWT_USER_SECRETKEY,
    { algorithm: "HS512" }
  );
};

module.exports.verify = function (token, callback) {
  try {
    return jwt.verify(token, process.env.JWT_USER_SECRETKEY, {}, callback);
  } catch (err) {
    return err;
  }
};

module.exports.decode = async (token) => {
  const parts = token.split(" ");
  if (parts.length === 2) {
    const scheme = parts[0];
    const credentials = parts[1];
    if (/^Bearer$/i.test(scheme)) {
      return credentials;
    }
    return false;
  }
  return false;
};
