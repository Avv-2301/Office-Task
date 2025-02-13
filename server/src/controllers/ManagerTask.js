const User = require("../models/User");
const Constant = require("../services/Constant");
const Department = require("../models/Department");

module.exports = {
  /**
   * @description This function is used to by manager to create department
   * @param req
   * @param res
   */

  createDepartment: async (req, res) => {
    try {
      const authUserId = req.authUserId;
      console.log(authUserId, "id from middleware");

      const requestParams = req.body;
      console.log(requestParams);

      if (
        !requestParams.departmentName ||
        !requestParams.categoryName ||
        !requestParams.location ||
        !requestParams.salary
      ) {
        return res.status(Constant.FAIL).json({
          success: false,
          message: "All fields are required",
        });
      }

      const user = await User.findOne(
        {
          $and: [{ status: Constant.ACTIVE }, { _id: authUserId }],
        },
        { verified: 1, role: 1 }
      );

      console.log(user, "getting user");

      if (user && user.verified !== null) {
        if (user.role === Constant.ROLE.MANAGER) {
          let department_obj = {
            departmentName: requestParams.departmentName,
            categoryName: requestParams.categoryName,
            location: requestParams.location,
            salary: requestParams.salary,
          };

          const response = await Department.create(department_obj);

          return res.status(Constant.FAIL).json({
            success: true,
            message: "Department created successfully",
          });
        } else {
          return res.status(Constant.FAIL).json({
            success: false,
            message: "You are not manager",
          });
        }
      } else {
        return res.status(Constant.FAIL).json({
          success: false,
          message: "User not found",
        });
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
