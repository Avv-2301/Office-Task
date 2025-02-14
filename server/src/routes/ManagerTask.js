const express = require("express");
const {
  createDepartment,
  getDepartments,
  deleteDepartment,
  assignEmployees,
  getAllEmployees,
  getEmployeesById,
} = require("../controllers/ManagerTask");
const router = express.Router();

router.post("/create-department", createDepartment);
router.get("/get-department", getDepartments);
router.delete("/delete-department", deleteDepartment);
router.put("/assign-employees", assignEmployees);
router.get("/get-employees", getAllEmployees);
router.get("/get-user", getEmployeesById)

module.exports = router;
