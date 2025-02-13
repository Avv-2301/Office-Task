const express = require("express");
const { createDepartment } = require("../controllers/ManagerTask");
const router = express.Router();


router.post("/create-department", createDepartment);

module.exports = router;
