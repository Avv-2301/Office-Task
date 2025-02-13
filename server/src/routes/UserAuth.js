const express = require("express");
const router = express.Router();

const { signUp, login, logout } = require("../controllers/Auth");

router.post("/sign-up", signUp);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;
