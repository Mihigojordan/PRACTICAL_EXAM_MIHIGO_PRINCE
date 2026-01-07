const express = require("express");
const router = express.Router();

const { login, logout } = require("../controller/auth.controller");

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

module.exports = router;
