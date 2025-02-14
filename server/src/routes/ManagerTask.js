const express = require("express");
const {
  createDepartment,
  getDepartments,
  deleteDepartment,
  assignEmployees,
} = require("../controllers/ManagerTask");
const router = express.Router();

router.post("/create-department", createDepartment);
router.get("/get-department", getDepartments);
router.delete("/delete-department", deleteDepartment);
router.post("/assign-employees", assignEmployees);

module.exports = router;
