const express = require("express");
const { createDepartment, getDepartments } = require("../controllers/ManagerTask");
const router = express.Router();


router.post("/create-department", createDepartment);
router.get("/get-department", getDepartments);

module.exports = router;
