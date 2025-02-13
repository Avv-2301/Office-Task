const express = require("express");
const { createDepartment, getDepartments, deleteDepartment } = require("../controllers/ManagerTask");
const router = express.Router();


router.post("/create-department", createDepartment);
router.get("/get-department", getDepartments);
router.delete("/delete-department", deleteDepartment);

module.exports = router;
