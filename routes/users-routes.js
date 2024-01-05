express = require("express");

const router = express.Router();

const usersController = require("../controllers/users-controller");

// Get all users

// Register

// Login

router.route("/").get(usersController.getAllUsers);

router.route("/register").post(usersController.register);

router.route("/login").post(usersController.login);

module.exports = router;
